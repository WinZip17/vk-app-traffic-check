import React, { useState, useEffect } from 'react';
import connect from '@vkontakte/vk-connect';
import View from '@vkontakte/vkui/dist/components/View/View';
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner';
import '@vkontakte/vkui/dist/vkui.css';
import './css/app.css';
import vinValidator from 'vin-validator'
import Home from './panels/Home';
import FullHistory from './panels/FullHistory';
import {gibdd_history, preview_data} from "./api";


const App = () => {
	const [activePanel, setActivePanel] = useState('home');
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(null); //<ScreenSpinner size='large' />
	const [previewData, setPreviewData] = useState(undefined);
	const [gibddHistory, setGibddHistory] = useState(undefined);
	const [number, setNumber] = useState(undefined);
	const [isValidNumber, setIsValidNumber] = useState(true);

	useEffect(() => {
		// connect.subscribe(({ detail: { type, data }}) => {
		// 	debugger
		// 	if (type === 'VKWebAppUpdateConfig') {
		// 		console.log(data)
		// 		const schemeAttribute = document.createAttribute('scheme');
		// 		schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
		// 		document.body.attributes.setNamedItem(schemeAttribute);
		// 	}
		// });

		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppUpdateConfig':
					let schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = e.detail.data.scheme ? e.detail.data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
					break;
				default:
					console.log(e.detail.type);
			}
		});
		async function fetchData() {
			const user = await connect.sendPromise('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null);
		}
		fetchData();
	}, []);


	const getPreviewData = () => {
		setPopout(<ScreenSpinner size='large' />)
		setPreviewData(undefined)
		setGibddHistory(undefined)
		preview_data(number, setPreviewData, setPopout, setIsValidNumber)
	};

	const getGibddHistory = () => {
		setPopout(<ScreenSpinner size='large' />)
		gibdd_history(number, setGibddHistory, setPopout, setIsValidNumber, setActivePanel)
	};

	const changeNumber = (value) => {
		if (value.currentTarget.value) {
			setIsValidNumber(false)
			if (value.currentTarget.value.length === 17 ) { //если длина больше 10, то VIN
				 setIsValidNumber(true)
			} else {
				if (value.currentTarget.value.length < 11) {
					let re = /^[АВЕКМНОРСТУХ]\d{3}(?<!000)[АВЕКМНОРСТУХ]{2}\d{2,3}$/ui
					re.test(value.currentTarget.value) ? setIsValidNumber(true) : setIsValidNumber(false)
				}
			}
		} else {
			setIsValidNumber(true)
		}
		setNumber(value.currentTarget.value.toUpperCase())
	};


	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel} popout={popout}>
			<Home id='home' fetchedUser={fetchedUser} go={go} previewData={previewData} setPopout={setPopout}
				  number={number} changeNumber={changeNumber} isValidNumber={isValidNumber}
				  getPreviewData={getPreviewData} getGibddHistory={getGibddHistory}/>
			<FullHistory id='FullHistory' go={go} gibddHistory={gibddHistory} previewData={previewData}/>
		</View>
	);
}

export default App;

