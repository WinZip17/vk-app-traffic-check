import React, { useState, useEffect, useRef } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './css/app.css';
import './css/dtp.css';
import Home from './panels/Home';
import FullHistory from './panels/FullHistory';
import {get_preview_report, getPrice, gibdd_history, old_history, preview_data} from "./api";
import MyChecks from "./panels/MyChecks";
import Comparison from "./panels/Comparison";
import Competitors from "./panels/Competitors";
import OldHistory from "./panels/OldHistory";
import PreviewHistiry from "./panels/PreviewHistiry";
import bridge from '@vkontakte/vk-bridge';


let app_id = 0
let group_id = 161851419
let userId = "";
let newNumder = 0;

export function get_name_browser(){
	let ua = navigator.userAgent;
	if (ua.search(/Firefox/) > 0) return true;
	return false;
}

const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<div className='spinner-shell'><ScreenSpinner size='large' /></div>); //<div className='spinner-shell'><ScreenSpinner size='large' /></div>
	const [previewData, setPreviewData] = useState(undefined);
	const [gibddHistory, setGibddHistory] = useState(undefined);
	const [number, setNumber] = useState('');
	const [isValidNumber, setIsValidNumber] = useState(true);
	const [isMobPlatform, setIsMobPlatform] = useState(false);
	const [previousPanel, setPreviousPanel] = useState('home');
	const [price, setPrice] = useState('0');
	const [previewDataPresent, setPreviewDataPresent] = useState(undefined);
	const [gibddHistoryPresent, setGibddHistoryPresent] = useState(undefined);
	const [isPreview, setIsPreview] = useState(false);
	const [isOldHistory, setIsOldHistory] = useState(false);
	const [idHistory, setIdHistory] = useState(null);
	const [oldHistoryArr, setOldHistoryArr] = useState(undefined);
	const [errorInfo,setErrorInfo] = useState("Некорректный VIN или госномер");
	const [myParam,setMyParam] = useState("");
	const [scheme,setScheme] = useState("");

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		setMyParam(urlParams.get('vk_platform'));
		app_id = urlParams.get('vk_app_id');
		urlParams.get('vk_platform') !== "desktop_web" && setIsMobPlatform(true)
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
						setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
						getInfo()
					} else {
						setPopout(null)
					}
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
		fetchData();
	}, []);

	const setHeight = (height) => {
		bridge.send("VKWebAppResizeWindow", { "height": height});
	}

	const getPreviewData = () => {
		setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
		setPreviewData(undefined)
		setGibddHistory(undefined)
		preview_data(number, setPreviewData, setPopout, setIsValidNumber, setHeight, setIsPreview, setErrorInfo, setActivePanel)
	};



	const getGibddHistory = () => {
		setIsOldHistory(false)
		setIsPreview(false)
		if (number && number === 'О111ЕХ102' ) {
			setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
			gibdd_history(newNumder, setGibddHistory, setPopout, setIsValidNumber, setActivePanel, setHeight, userId, setIsPreview)
		} else if (number && number === 'SALVA1BD8CH641467' ) {
			setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
			gibdd_history(newNumder, setGibddHistory, setPopout, setIsValidNumber, setActivePanel, setHeight, userId, setIsPreview)
		} else {
			if (price.toString() === "0") {
				setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
				gibdd_history(newNumder, setGibddHistory, setPopout, setIsValidNumber, setActivePanel, setHeight, userId, setIsPreview)
			} else {
				bridge.send("VKWebAppOpenPayForm", {"app_id": +app_id, "action": "pay-to-group", "params": {"amount" : price, "description" : `Оплата проверки истории авто. ${number > 11 ? "VIN" + number : "Госномер:" + number}`, 'group_id' : group_id }})
			}
     			// connect.send("VKWebAppOpenPayForm", {"app_id": +app_id, "action": "pay-to-group", "params": {"amount" : price, "description" : `Оплата проверки истории авто. ${number > 11 ? "VIN" + number : "Госномер:" + number}`, 'group_id' : group_id }})
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
		if (previewDataPresent === undefined) {
			setPopout(<div className='spinner-shell'><ScreenSpinner size='large' /></div>)
			get_preview_report("О111ЕХ102", setPreviewDataPresent, setPopout, setHeight, setGibddHistoryPresent, setActivePanel)
		} else {
			setActivePanel('FullHistory')
		}
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
		gibdd_history(newNumder, setGibddHistory, setPopout, setIsValidNumber, setActivePanel, setHeight, userId, setIsPreview)
	}

	return (
		<View activePanel={activePanel} popout={popout} >
			<Home id='home' fetchedUser={fetchedUser} go={go} previewData={previewData} setPopout={setPopout} errorInfo={errorInfo}
				  number={number} changeNumber={changeNumber} isValidNumber={isValidNumber} getPreviewReport={getPreviewReport}
				  getPreviewData={getPreviewData} getGibddHistory={getGibddHistory} isMobPlatform={isMobPlatform}
				  activePanel={activePanel} setActivePanel={setActivePanel} price={price} setPreviousPanel={setPreviousPanel} setHeight={setHeight}
				  myParam={myParam}
			/>
			<MyChecks id='my-checks' activePanel={activePanel} setActivePanel={setActivePanel} setPreviousPanel={setPreviousPanel}
					  getOldHistory={getOldHistory} setHeight={setHeight} oldHistoryArr={oldHistoryArr} popout={popout}
					  setIdHistory={setIdHistory} isMobPlatform={isMobPlatform} setPopout={setPopout} getPreviewReport={getPreviewReport}
					  myParam={scheme} setIsOldHistory={setIsOldHistory}/>
			<Comparison id='comparison' activePanel={activePanel} setActivePanel={setActivePanel} setPreviousPanel={setPreviousPanel}
						isMobPlatform={isMobPlatform} getPreviewReport={getPreviewReport} price={price} setHeight={setHeight} setPopout={setPopout}
						myParam={scheme}/>
			<Competitors id='competitors' activePanel={activePanel} setActivePanel={setActivePanel} setPreviousPanel={setPreviousPanel}
						 getPreviewReport={getPreviewReport} price={price} isMobPlatform={isMobPlatform} setHeight={setHeight}
						 setPopout={setPopout} getPreviewData={getPreviewData}
						 myParam={scheme}/>
			<FullHistory id='FullHistory' previousPanel={previousPanel} setActivePanel={setActivePanel} gibddHistory={gibddHistory} previewData={previewData}
						 isMobPlatform={isMobPlatform} previewDataPresent={previewDataPresent} gibddHistoryPresent={gibddHistoryPresent}
						 isPreview={isPreview} setIsPreview={setIsPreview} setHeight={setHeight} getPreviewData={getPreviewData}
						 getPreviewReport={getPreviewReport} activePanel={activePanel} setPopout={setPopout} oldHistoryArr={oldHistoryArr}
						 myParam={scheme} isOldHistory={isOldHistory} idHistory={idHistory}/>
			{/*<OldHistory id='OldHistory' go={go} oldHistoryArr={oldHistoryArr} gibddHistory={gibddHistory}*/}
			{/*			 isMobPlatform={isMobPlatform} idHistory={idHistory} setHeight={setHeight} getPreviewReport={getPreviewReport}*/}
			{/*			activePanel={activePanel} setActivePanel={setActivePanel} setPopout={setPopout}*/}
			{/*			myParam={scheme}/>*/}
			<PreviewHistiry fetchedUser={fetchedUser} id='PreviewHistiry' go={go} setHeight={setHeight} previewData={previewData}
							isValidNumber={isValidNumber} getGibddHistory={getGibddHistory} price={price}
							number={number} myParam={myParam}/>
		</View>
	);
}

export default App;

