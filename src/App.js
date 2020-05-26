import React, { useState, useEffect, useRef } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './css/app.css';
import './css/dtp.css';
import Home from './panels/Home';
import FullHistory from './panels/FullHistory';
import {
	get_preview_report,
	getPrice,
	getTerms,
	gibdd_history,
	gibdd_history_ios,
	old_history,
	preview_data
} from "./api";
import MyChecks from "./panels/MyChecks";
import Comparison from "./panels/Comparison";
import Competitors from "./panels/Competitors";
import PreviewHistiry from "./panels/PreviewHistiry";
import bridge from '@vkontakte/vk-bridge';
import Alert from "@vkontakte/vkui/dist/components/Alert/Alert";
import Icon28HomeOutline from '@vkontakte/icons/dist/28/home_outline';
import TabbarItem from "@vkontakte/vkui/dist/components/TabbarItem/TabbarItem";
import Epic from "@vkontakte/vkui/dist/components/Epic/Epic";
import Tabbar from "@vkontakte/vkui/dist/components/Tabbar/Tabbar";
import Icon28HistoryForwardOutline from '@vkontakte/icons/dist/28/history_forward_outline';
import Info from "./panels/Info";
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';
import ModalPageHeader from "@vkontakte/vkui/dist/components/ModalPageHeader/ModalPageHeader";
import ModalPage from "@vkontakte/vkui/dist/components/ModalPage/ModalPage";
import ModalRoot from "@vkontakte/vkui/dist/components/ModalRoot/ModalRoot";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Dismiss from '@vkontakte/icons/dist/24/dismiss';
import Div from "@vkontakte/vkui/dist/components/Div/Div";

let app_id = 0
let group_id = 161851419
let userId = ""
let newNumder = 0
let isIos = false
let email = null

export function get_name_browser(){
	let ua = navigator.userAgent;
	if (ua.search(/Firefox/) > 0) return true;
	return false;
}

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [activeStory, setActiveStory] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<div className='spinner-shell'><ScreenSpinner size='large' /></div>); //<div className='spinner-shell'><ScreenSpinner size='large' /></div>
	const [previewData, setPreviewData] = useState(undefined);
	const [gibddHistory, setGibddHistory] = useState(undefined);
	const [number, setNumber] = useState('');
	const [isValidNumber, setIsValidNumber] = useState(true);
	const [isMobPlatform, setIsMobPlatform] = useState(false);
	const [previousPanel, setPreviousPanel] = useState('home');
	const [price, setPrice] = useState('0');
	const [isPreview, setIsPreview] = useState(false);
	const [isOldHistory, setIsOldHistory] = useState(false);
	const [idHistory, setIdHistory] = useState(null);
	const [oldHistoryArr, setOldHistoryArr] = useState(undefined);
	const [errorInfo,setErrorInfo] = useState("Некорректный VIN или госномер");
	const [myParam,setMyParam] = useState("");
	const [scheme,setScheme] = useState("");
	const [emailValue,setEmailValue] = useState("");
	const [terms,setTerms] = useState("");
	const [activeModal,setActiveModal] = useState(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		setMyParam(urlParams.get('vk_platform'));
		app_id = urlParams.get('vk_app_id');
		urlParams.get('vk_platform') !== "desktop_web" && setIsMobPlatform(true)
		isIos = urlParams.get('vk_platform') === "mobile_iphone" || myParam === "mobile_iphone_messenger"
		bridge.subscribe(({ detail: { type, data }}) => {
			switch (type) {
				case 'VKWebAppUpdateConfig':
					let schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = data.scheme ? data.scheme : 'bright_light';
					setScheme(data.scheme ? data.scheme : 'bright_light')
					document.body.attributes.setNamedItem(schemeAttribute);
					break;
				case 'VKWebAppOpenPayFormResult':
					if (data.status) {
						if (email) {
							getInfoIos(email)
							setPopout(alertResult)
						} else {
							setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
							getInfo()
						}
					} else {
						setPopout(null)
					}
					break;
				case 'VKWebAppResizeWindowResult':
					break;
				case 'VKWebAppOpenPayFormFailed':
					setPopout(null)
					break;
				default:
					console.log(type);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			userId = user.id
			setPopout(null);
		}
		getPrice(setPrice)
		getTerms(setTerms)
		fetchData();
	}, []);

	const getPreviewData = () => {
		setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
		setPreviewData(undefined)
		setGibddHistory(undefined)
		preview_data(number, setPreviewData, setPopout, setIsValidNumber, setIsPreview, setErrorInfo, setActivePanel)
	};

	const setGlobalEmail = (value) => {
		email = value
		setEmailValue(value)
	}

	const getGibddHistory = () => {
		setIsOldHistory(false)
		setIsPreview(false)
		if (price.toString() === "0" || number === 'О111ЕХ102'  || number === 'SALVA1BD8CH641467') {
			// setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
			// gibdd_history(newNumder, setGibddHistory, setPopout, setIsValidNumber, setActiveStory, userId, setIsPreview)
			if (email) {
				getInfoIos(email)
				setPopout(alertResult)
				setNumber('')
				newNumder = 0
			}
		} else {
			bridge.send("VKWebAppOpenPayForm", {"app_id": +app_id, "action": "pay-to-group", "params": {"amount" : price, "description" : `Оплата проверки истории авто. ${number > 11 ? "VIN" + number : "Госномер:" + number}`, 'group_id' : group_id }})
		}
	};

	const getOldHistory = () => {
		setIsOldHistory(true)
		setIsPreview(false)
			setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
			old_history(fetchedUser.id, setOldHistoryArr, setActivePanel, setPopout)
	};

	const getPreviewReport = () => {
		setIsPreview(true)
		setIsOldHistory(false)
		setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
		get_preview_report("О111ЕХ102", setPopout, setGibddHistory, setActiveStory)
	}

	const changeNumber = (value) => {
		let newValue = value.currentTarget.value.toString().toUpperCase()
		if (newValue) {
			setIsValidNumber(false)
			if (newValue.length === 17 ) { //если длина больше 10, то VIN
				newValue = newValue.replace(/У/g, "Y")
				newValue = newValue.replace(/А/g, 'A')
				newValue = newValue.replace(/В/g, 'B')
				newValue = newValue.replace(/Е/g, 'E')
				newValue = newValue.replace(/К/g, 'K')
				newValue = newValue.replace(/M/g, 'M')
				newValue = newValue.replace(/H/g, 'H')
				newValue = newValue.replace(/О/g, 'O')
				newValue = newValue.replace(/Р/g, 'P')
				newValue = newValue.replace(/С/g, 'C')
				newValue = newValue.replace(/Т/g, 'T')
				newValue = newValue.replace(/Х/g, 'X')
				setIsValidNumber(true)
			} else {
				if (newValue.length < 10) {
					newValue = newValue.replace(/Y/g, "У")
					newValue = newValue.replace(/A/g, 'А')
					newValue = newValue.replace(/B/g, 'В')
					newValue = newValue.replace(/E/g, 'Е')
					newValue = newValue.replace(/K/g, 'К')
					newValue = newValue.replace(/M/g, 'M')
					newValue = newValue.replace(/H/g, 'H')
					newValue = newValue.replace(/O/g, 'О')
					newValue = newValue.replace(/P/g, 'Р')
					newValue = newValue.replace(/C/g, 'С')
					newValue = newValue.replace(/T/g, 'Т')
					newValue = newValue.replace(/X/g, 'Х')
					let re = /^[АВЕКМНОРСТУХ]\d{3}[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui
					re.test(newValue) ? setIsValidNumber(true) : setIsValidNumber(false)
					re.test(newValue) ? setIsValidNumber(true) : errorInfo !== 'Некорректный VIN или госномер' && setErrorInfo('Некорректный VIN или госномер')
				}
			}
		} else {
			setIsValidNumber(true)
		}
		setNumber(newValue)
		newNumder = newValue
	};

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	const getInfo = () => {
		gibdd_history(newNumder, setGibddHistory, setPopout, setIsValidNumber, setActiveStory, userId, setIsPreview)
	}

	const getInfoIos = (mail) => {
		gibdd_history_ios(newNumder, setGibddHistory, setPopout, setIsValidNumber, setActivePanel, userId, mail)
	}

	const createMarkup = (text) => {
		return {__html: text}
	}

	const modal = (
		<ModalRoot
			activeModal={activeModal}
			onClose={() => setActiveModal(null)}
		>
			<ModalPage
				id='hard-text'
				onClose={() => setActiveModal(null)}
				header={
					<ModalPageHeader
						left={!isIos && <PanelHeaderButton onClick={() => setActiveModal(null)}><Icon24Cancel /></PanelHeaderButton>}
						right={isIos && <PanelHeaderButton onClick={() => setActiveModal(null)}><Icon24Dismiss /></PanelHeaderButton>}
					>
						Договор оферты
					</ModalPageHeader>
				}
			>
				<Div>
					<div dangerouslySetInnerHTML={createMarkup(terms)}/>
				</Div>
			</ModalPage>
		</ModalRoot>
	);

	const alertResult = (
		<Alert
			actions={[{
				title: 'Хорошо',
				autoclose: false,
				action: () => setPopout( null )
			}]}
			onClose={() => setPopout( null )}
		>
			{isIos ? <h2>Формирование отчёта занимает от 1 до 5 минут. Отчёт будет отправлен на ваш e-mail.</h2> : <h2>Формирование отчёта занимает от 1 до 5 минут. Отчёт будет отправлен на ваш e-mail и доступен в разделе "Мои проверки".</h2>}
		</Alert>
	)
	return (
		<Epic activeStory={activeStory} tabbar={
			<Tabbar>
				<TabbarItem
					onClick={() => {
						setActiveStory('home')
						setActivePanel('home')
					}}
					selected={activeStory === 'home'}
				><Icon28HomeOutline /></TabbarItem>
				{/*<TabbarItem*/}
				{/*	onClick={() => getPreviewReport()}*/}
				{/*	selected={activeStory === 'FullHistory'}*/}
				{/*	text="Пример отчёта"*/}
				{/*><Icon28MagicWandOutline /></TabbarItem>*/}
				{(myParam === "mobile_iphone" || myParam === "mobile_iphone_messenger" ) ? ""  : <TabbarItem
					onClick={() => setActiveStory('my-checks')}
					selected={activeStory === 'my-checks'}
					text="Мои проверки"
				><Icon28HistoryForwardOutline /></TabbarItem>}
				<TabbarItem
					onClick={() => {
						setActiveStory('info')
					}}
					selected={activeStory === 'info'}
					text="Информация"
				><Icon28InfoOutline /></TabbarItem>

			</Tabbar>
		}>
			<View id='home' activePanel={activePanel} popout={popout} modal={modal}>
				<Home id='home' errorInfo={errorInfo} go={go}
					  number={number} changeNumber={changeNumber} isValidNumber={isValidNumber}
					  getPreviewData={getPreviewData} isMobPlatform={isMobPlatform}
					  setActivePanel={setActivePanel} price={price} setPreviousPanel={setPreviousPanel}
					  getPreviewReport={getPreviewReport} setActiveStory={setActiveStory}
				/>
				<Competitors id='competitors' setActivePanel={setActivePanel}
							 setPreviousPanel={setPreviousPanel}
							 getPreviewReport={getPreviewReport} price={price} isMobPlatform={isMobPlatform}
				/>
				<Comparison id='comparison' setActivePanel={setActivePanel}
							setPreviousPanel={setPreviousPanel}
							isMobPlatform={isMobPlatform} getPreviewReport={getPreviewReport} price={price}
							/>
				<PreviewHistiry fetchedUser={fetchedUser} id='PreviewHistiry' go={go}
								previewData={previewData} getGibddHistory={getGibddHistory} price={price}
								number={number} myParam={myParam} setEmailValue={setGlobalEmail} emailValue={emailValue}
								setActiveModal={setActiveModal}
				/>
			</View>
			<View id='my-checks' activePanel='mc' popout={popout}>
				<MyChecks id='mc' setActiveStory={setActiveStory}
						  setPreviousPanel={setPreviousPanel}
						  getOldHistory={getOldHistory} oldHistoryArr={oldHistoryArr}
						  popout={popout}
						  setPopout={setPopout}
						  setIdHistory={setIdHistory}
						  setIsOldHistory={setIsOldHistory}/>
			</View>
			<View id='FullHistory' activePanel='fh' popout={popout}>
				<FullHistory id='fh'
							 gibddHistory={gibddHistory}
							 isPreview={isPreview}
							 oldHistoryArr={oldHistoryArr}
							 isOldHistory={isOldHistory}
							 idHistory={idHistory}
							 setActiveStory={setActiveStory}
				/>
			</View>
			<View id='info' activePanel='fff' popout={popout}>
				<Info id='fff' text={terms}/>
			</View>
		</Epic>
	);
}

export default App;

