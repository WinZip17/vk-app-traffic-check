import React, { useEffect} from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import FormLayout from "@vkontakte/vkui/dist/es6/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/es6/components/Input/Input";
import FormStatus from "@vkontakte/vkui/dist/es6/components/FormStatus/FormStatus";
import main from "../img/main.jpg";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Icon56ShuffleOutline from '@vkontakte/icons/dist/56/shuffle_outline';
import Icon56InfoOutline from '@vkontakte/icons/dist/56/info_outline';
import logo from "../img/logo_full.jpg"
import find_cars from "../img/find_cars.png"



const Home = (props) => {
	const {id, isMobPlatform, number, errorInfo,
		changeNumber, isValidNumber, getPreviewData,
		setHeight, price, setPreviousPanel,
		getPreviewReport, setActiveStory, myParam} = props

	useEffect(() => {
		setPreviousPanel(id)
		setHeight(750)
	}, []);

	return 	<Panel id={id}>
		<PanelHeader><a target="_BLANK" className='panel-header-link' href="https://easy-vin.ru ">easy-vin.ru</a></PanelHeader>
		<Div className='competitors-content fix-logo'>
			<div  className={`${myParam === 'desktop_web' ? 'home-logo-shell-desktop' : 'home-logo-shell' }`}>
				<img  src={logo} alt='logo' className='home-logo'/>
			</div>

		</Div>

		<Group>
			<Div>
				{isMobPlatform && <div className="main-img-text">
					<h3>Узнай её прошлое, <br/><span className='subtext'>прежде чем взять</span></h3>
					<h5 className='subtext'>Проверка истории авто по VIN <br/>или госномеру за <span className='price-text-header arial'>{price} ₽</span></h5>
				</div>}
				{!isMobPlatform && <div className="main-img-text main-img-text-desktop" >
					<h2 className='header-text'>Узнай её прошлое, <br/><span className='subtext'>прежде чем взять</span></h2>
					<h3 className='subtext'>Проверка истории авто по VIN <br/>или госномеру за <span className='price-text-header-desktop'><span className='arial'>{price}	₽</span></span></h3>
				</div>}
				<img src={main} alt='main' className="main-img" />
			</Div>
				<FormLayout >
					<Input status={isValidNumber? "default" : "error"} type="text" value={number} onChange={changeNumber} alignment="center" placeholder='VIN или госномер' />
					{!isValidNumber && <FormStatus state="error">
						{errorInfo}
					</FormStatus>}
				</FormLayout>
			<Div>
				<Button disabled={!isValidNumber || !number} size="xl" onClick={getPreviewData} >
					Проверить авто
				</Button>
			</Div>
		</Group>
		<Group>
			<Cell className='textCenter pointer' before={<img className='icon-img' src={find_cars} alt="car"/>} centered={'true'} onClick={() => {
				getPreviewReport()
				setActiveStory('FullHistory')
			}}>
				Пример отчёта
			</Cell>
		</Group>
	</Panel>

};

export default Home;
