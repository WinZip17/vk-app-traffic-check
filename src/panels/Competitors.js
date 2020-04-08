import React, {useEffect} from 'react';
import {Group, IOS, platform} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osName = platform();

const Competitors = (props) => {
	const {id, setActivePanel, getPreviewReport,
		setPreviousPanel, price, isMobPlatform} = props

	useEffect(() => {
		setPreviousPanel(id)
	}, []);


	return <Panel id={id}>
		<PanelHeader left={<PanelHeaderButton onClick={() => {
			setActivePanel('home')
		}}>
			{osName === IOS ? <Icon28ChevronBack className="pointer" /> : <Icon24Back className="pointer" />}
		</PanelHeaderButton>}><a target="_BLANK" className='panel-header-link' href="https://xn----8sbbfchakv0a5blnd.xn--p1ai/">ГИБДД-проверка.рф</a></PanelHeader>
		{/*<Menu myParam={myParam} getPreviewReport={getPreviewReport} activePanel={activePanel} setActivePanel={setActivePanel} isMobPlatform={isMobPlatform} setPopout={setPopout}/>*/}
		<Group>
			<Div className="textCenter">
				<h3>Чем мы лучше конкурентов</h3>
				<hr className='blue-line'/>
				<p>Мы создали по-настоящему удобный и недорогой сервис для проверки истории авто по VIN или госномеру</p>
			</Div>
			<div className={!isMobPlatform ? "competitors-content" : ""}>

				<Div className={!isMobPlatform ? "сompetitors-content-div" : "textCenter"}>
					<span className={`icon-circle ${!isMobPlatform && "icon-circle-desktop"}`} data-icon="1"/>
					<h3>Удобство</h3>
					<p>Быстрое формирование отчёта онлайн, никакой регистрации и ввода каптчи. Также, мы создали Telegram-бот с удобным интерфейсом и системой платежей</p>
				</Div>

				<Div className={!isMobPlatform ? "сompetitors-content-div" : "textCenter"}>
					<span className={`${!isMobPlatform && "icon-circle-desktop"} icon-circle`} data-icon="2"/>
					<h3>Полнота Данных</h3>
					<p><span>ГИБДД проверка авто</span> (регистрации, ДТП, ограничения, розыск), данные о залогах, история пробега, диагностическая карта, проверка авто по базе РСА (ОСАГО), проверка авто на штрафы, фотографии, объявления о продаже, профили на drive2.ru, характеристики авто, проверка авто на работу в такси. </p>
					<Button onClick={getPreviewReport}>Пример отчёта</Button>
				</Div>

				<Div className={!isMobPlatform ? "сompetitors-content-div" : "textCenter"}>
					<span className={`icon-circle ${!isMobPlatform && "icon-circle-desktop"}`} data-icon="3"/>
					<h3>Стоимость {price}<span className='arial'>₽</span></h3>
					<p>Невысокая стоимость проверки истории автомобиля обусловлена тем, что мы не берем деньги за те данные, которые доступны нам бесплатно</p>
				</Div>
			</div>
		</Group>
	</Panel>
}

export default Competitors;
