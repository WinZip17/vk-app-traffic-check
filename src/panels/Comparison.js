import React, {useEffect} from 'react';
import {Group, IOS, platform} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';


const osName = platform();



const Comparison = (props) => {
	const {id, setActivePanel, setPreviousPanel, isMobPlatform, getPreviewReport, price} = props

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
				<h3>Сравнение цен на рынке</h3>
				<hr className='blue-line'/>
				<p>Купи дешевле — продай дороже</p>
			</Div>
			<div className={!isMobPlatform ? "competitors-content textCenter" : ""}>
				<Div className={`comparison-content-div ${!isMobPlatform && "content-div"}`}>
					<div className='border-price-block textCenter' >
						<h3 className='comparison-content-header-active'>НАШ СЕРВИС</h3>
						<p className='comparison-content-website'>САЙТ/TELEGRAM-БОТ</p>
						<p className='comparison-content-price-active'>{price} <span className='arial'>&#8381;</span>/отчёт</p>
						<p>есть <span>ГИБДД проверка авто </span> </p>
						<p>есть данные о залогах</p>
						<p>есть данные о пробеге</p>
						<p>есть проверка авто на такси</p>
						<p>есть номер двигателя</p>
						<p>есть данные диагн. карты</p>
						<p>есть данные ОСАГО</p>
						<p>есть объявления о продаже</p>
						<p>есть ссылки на профили drive2.ru</p>
						<p>есть проверка авто на штрафы</p>
						<Button className={isMobPlatform ? "fix-padding-bottom-buton" : "fix-padding-bottom-mobile"} onClick={getPreviewReport} align={isMobPlatform ? "center" : "left"}>Пример отчёта</Button>
					</div>
				</Div>

				<Div className={`comparison-content-div ${!isMobPlatform && "content-div"}`}>
					<div className='border-price-block-pasiv textCenter'>
						<h3 className='comparison-content-header-pasiv'>AUTOTEKA.RU</h3>
						<p className='comparison-content-website'>САЙТ/ПРИЛОЖЕНИЕ</p>
						<p className='comparison-content-price-pasiv'>129 <span className='arial'>&#8381;</span>/отчёт</p>
						<p>есть <span>ГИБДД проверка авто </span> </p>
						<p>есть данные о залогах</p>
						<p>есть данные о пробеге</p>
						<p><span className='text-bold'>нет</span> проверки авто на такси</p>
						<p><span className='text-bold'>нет</span> номера двигателя</p>
						<p>есть данные диагн. карты</p>
						<p><span className='text-bold'>нет</span> данных ОСАГО</p>
						<p>есть объявления о продаже только с avito.ru</p>
						<p><span className='text-bold'>нет</span> ссылок на профили drive2.ru</p>
						<p><span className='text-bold'>нет</span> проверки авто на штрафы</p>
						<form action="https://autoteka.ru/vin/example" target="_blank">
							<Button className={isMobPlatform ? "fix-padding-bottom-buton" : "fix-padding-bottom-mobile"} align={isMobPlatform ? "center" : "left"}>Пример отчёта</Button>
						</form>
					</div>
				</Div>

				<Div className={`comparison-content-div ${!isMobPlatform && "content-div"}`}>
					<div className='border-price-block-pasiv textCenter'>
						<h3 className='comparison-content-header-pasiv'>АВТОИСТОРИЯ.РФ</h3>
						<p className='comparison-content-website'>САЙТ/ПРИЛОЖЕНИЕ</p>
						<p className='comparison-content-price-pasiv'>199 <span className='arial'>&#8381;</span>/отчёт</p>
						<p>есть <span>ГИБДД проверка авто </span> </p>
						<p>есть данные о залогах</p>
						<p>есть данные о пробеге</p>
						<p>есть проверка авто на такси</p>
						<p>есть номер двигателя</p>
						<p>есть данные диагн. карты</p>
						<p>есть данные ОСАГО</p>
						<p><span className='text-bold' >нет</span> объявлений о продаже</p>
						<p><span className='text-bold'>нет</span> ссылок на профили drive2.ru</p>
						<p>есть проверки авто на штрафы</p>
						<form action="https://xn----7sbgza7acqhge3n.xn--p1ai/example/" target="_blank">
							<Button className={isMobPlatform ? "fix-padding-bottom-buton" : "fix-padding-bottom-mobile"} align={isMobPlatform ? "center" : "left"}>Пример отчёта</Button>
						</form>
					</div>
				</Div>

				<Div className={`comparison-content-div ${!isMobPlatform && "content-div"}`}>
					<div className='border-price-block-pasiv textCenter'>
						<h3 className='comparison-content-header-pasiv'>ADAPERIO.RU</h3>
						<p className='comparison-content-website'>САЙТ/ПРИЛОЖЕНИЕ</p>
						<p className='comparison-content-price-pasiv'>292  <span className='arial'>&#8381;</span>/отчёт</p>
						<p>есть <span>ГИБДД проверка авто </span> </p>
						<p>есть данные о залогах</p>
						<p>есть данные о пробеге</p>
						<p>есть проверка авто на такси</p>
						<p>есть номер двигателя</p>
						<p><span className='text-bold'>нет</span> данных диагн. карты</p>
						<p><span className='text-bold'>нет</span> данных ОСАГО</p>
						<p><span className='text-bold'>нет</span> объявлений о продаже</p>
						<p><span className='text-bold'>нет</span> ссылок на профили drive2.ru</p>
						<p>есть проверки авто на штрафы</p>
						<form action="https://adaperio.ru/ReportExample" target="_blank">
							<Button className={isMobPlatform ? "fix-padding-bottom-buton" : "fix-padding-bottom-mobile"} align={isMobPlatform ? "center" : "left"}>Пример отчёта</Button>
						</form>
					</div>
				</Div>

				<Div className={`comparison-content-div ${!isMobPlatform && "content-div"}`}>
					<div className='border-price-block-pasiv textCenter'>
						<h3 className='comparison-content-header-pasiv'>AVTORAPORT.RU</h3>
						<p className='comparison-content-website'>САЙТ/ПРИЛОЖЕНИЕ</p>
						<p className='comparison-content-price-pasiv'>299  <span className='arial'>&#8381;</span>/отчёт</p>
						<p>есть <span>ГИБДД проверка авто </span> </p>
						<p>есть данные о залогах</p>
						<p>есть данные о пробеге</p>
						<p>есть проверка авто на такси</p>
						<p>есть номер двигателя</p>
						<p>есть данные диагн. карты</p>
						<p>есть данные ОСАГО</p>
						<p><span className='text-bold'>нет</span> объявлений о продаже</p>
						<p><span className='text-bold'>нет</span> ссылок на профили drive2.ru</p>
						<p><span className='text-bold'>нет</span> проверки авто на штрафы</p>
						<form action="https://avtoraport.ru/example" target="_blank">
							<Button className={isMobPlatform ? "fix-padding-bottom-buton" : "fix-padding-bottom-mobile"} align={isMobPlatform ? "center" : "left"}>Пример отчёта</Button>
						</form>
					</div>
				</Div>

				<Div className={`comparison-content-div ${!isMobPlatform && "content-div"}`}>
					<div className='border-price-block-pasiv textCenter'>
						<h3 className='comparison-content-header-pasiv'>AVTOCOD.RU</h3>
						<p className='comparison-content-website'>САЙТ/ПРИЛОЖЕНИЕ</p>
						<p className='comparison-content-price-pasiv'>349 <span className='arial'>&#8381;</span>/отчёт</p>
						<p>есть <span>ГИБДД проверка авто </span> </p>
						<p>есть данные о залогах</p>
						<p>есть данные о пробеге</p>
						<p>есть проверка авто на такси</p>
						<p>есть номер двигателя</p>
						<p>есть данные диагн. карты</p>
						<p>есть данные ОСАГО</p>
						<p>есть объявления о продаже</p>
						<p><span className='text-bold'>нет</span> ссылок на профили drive2.ru</p>
						<p>есть проверки авто на штрафы</p>
						<form action="https://avtocod.ru/report-sample" target="_blank">
							<Button className={isMobPlatform ? "fix-padding-bottom-buton" : "fix-padding-bottom-mobile"} align={isMobPlatform ? "center" : "left"}>Пример отчёта</Button>
						</form>
					</div>
				</Div>
			</div>
		</Group>
	</Panel>
}

export default Comparison;
