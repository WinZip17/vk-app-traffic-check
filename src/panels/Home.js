import React, {Fragment, useState} from 'react';
import PropTypes from 'prop-types';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Button from '@vkontakte/vkui/dist/components/Button/Button';
import Group from '@vkontakte/vkui/dist/components/Group/Group';
import Cell from '@vkontakte/vkui/dist/components/Cell/Cell';
import Div from '@vkontakte/vkui/dist/components/Div/Div';
import Avatar from '@vkontakte/vkui/dist/components/Avatar/Avatar';
import FormLayout from "@vkontakte/vkui/dist/es6/components/FormLayout/FormLayout";
import Input from "@vkontakte/vkui/dist/es6/components/Input/Input";
import FormStatus from "@vkontakte/vkui/dist/es6/components/FormStatus/FormStatus";


const Home = (props) => {
	const { id, go, fetchedUser, setPopout, previewData, number, changeNumber, isValidNumber, getPreviewData, getGibddHistory } = props

	const Hashtag = <Fragment><span className="bl_color">#</span></Fragment>

	const getNamePreviewDataArr = (name) => {
		let arr = []
		if (previewData) {
			for (let key in previewData) (
				arr.push(key)
			)

		}
		return arr.includes(name) && previewData[name].length > 0
	}

	//disabled={!isValidNumber || !number}
	return 	<Panel id={id}>
		<PanelHeader>ГИБДД проверка</PanelHeader>
		{/*{fetchedUser &&*/}
		{/*<Group>*/}
		{/*	<Cell*/}
		{/*		before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}*/}
		{/*		description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}*/}
		{/*	>*/}
		{/*		{`${fetchedUser.first_name} ${fetchedUser.last_name}`}*/}
		{/*	</Cell>*/}
		{/*</Group>}*/}

		<Group>
			<Div>
				<h2>Узнай её прошлое, прежде чем взять</h2>
				<h5>Проверка истории авто по VIN или госномеру за 100₽</h5>
			</Div>
				<FormLayout >
					<Input status={isValidNumber? "default" : "error"} type="text" value={number} onChange={changeNumber} alignment="center" placeholder='VIN или госномер' />
					{!isValidNumber && <FormStatus state="error">
						Некорректный VIN или госномер
					</FormStatus>}
				</FormLayout>
			<Div>
				<Button disabled={!isValidNumber || !number} size="xl" onClick={getPreviewData} >
					Проверить авто
				</Button>
			</Div>
		</Group>
		{previewData && <Group>
			<Div className='textCenter'>
				<h2>
					{getNamePreviewDataArr("model") && previewData.model}{getNamePreviewDataArr("year") && ", " + previewData.year}
				</h2>
				<p>
					{getNamePreviewDataArr("body_number") && <span>{Hashtag}{"VIN: " + previewData.body_number + "  "}</span>}
					{getNamePreviewDataArr("plate") && <span>{Hashtag}{"госномер: " + previewData.plate + "  "}</span>}
					{getNamePreviewDataArr("capacity") && <span>{Hashtag}{previewData.capacity + " куб. см" + "  "}</span>}
					{getNamePreviewDataArr("power") && <span>{Hashtag}{previewData.power + "  л.с." + "  "}</span>}
					{getNamePreviewDataArr("wheel") && <span>{Hashtag}{"руль: " + previewData.wheel + "  "}</span>}
					{getNamePreviewDataArr("category") && <span>{Hashtag}{"Категория ТС: " + previewData.category + "  "}</span>}
					{getNamePreviewDataArr("weight") && <span>{Hashtag}{"вес: " + previewData.weight + " кг "}</span>}
					{getNamePreviewDataArr("engine_type") && <span>{Hashtag}{"тип двигателя: " + previewData.engine_type + "  "}</span>}
				</p>
				{getNamePreviewDataArr("image") && <img src={previewData.image} alt='photo' className='photo'/>}
			</Div>
			<Div className='textCenter'>
				<h3>В полном отчёте за 100₽ доступно:</h3>
				<p>
					{Hashtag}пробег {Hashtag}регистрации {Hashtag}ДТП {Hashtag}ограничения {Hashtag}розыск {Hashtag}данные о залогах {Hashtag}диагностическая карта {Hashtag}ОСАГО {Hashtag}штрафы {Hashtag}фотографии {Hashtag}объявления о продаже {Hashtag}профили на drive2.ru {Hashtag}проверка на работу в такси {Hashtag}характеристики авто
				</p>
			</Div>

			<Div>
				<Button size="xl" disabled={!isValidNumber || !number} onClick={getGibddHistory} >
					Купить полный отчет
				</Button>
			</Div>
		</Group>}
	</Panel>

};

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
