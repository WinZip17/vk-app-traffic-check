import React, {Fragment, useEffect} from 'react';
import {platform, IOS, Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
//eslint-disable-next-line import/no-webpack-loader-syntax
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {modifyUrl} from "../util";

const osName = platform();

const PreviewHistiry = (props) => {
	const {id, go, setHeight, previewData,  getGibddHistory, price} = props
	const Hashtag = <Fragment><span className="bl_color">#</span></Fragment>

	useEffect(() => {
		setHeight(1000)
	}, []);

	const getNamePreviewDataArr = (name) => {
		let arr = []
		if (previewData) {
			for (let key in previewData) (
				arr.push(key)
			)

		}
		return arr.includes(name) && previewData[name].length > 0
	}

	return <Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			История автомобиля
		</PanelHeader>
		<Group>

				<Div className='textCenter'>
					<h2 id='someId'>
						{getNamePreviewDataArr("model") && previewData.model}{getNamePreviewDataArr("year") && ", " + previewData.year}
					</h2>
					<p>
						{getNamePreviewDataArr("body_number") && <span>{Hashtag}{`${previewData.body_number.length === 17? "VIN: " : "Кузов: "}` + previewData.body_number + "  "}</span>}
						{getNamePreviewDataArr("plate") && <span>{Hashtag}{"Госномер: " + previewData.plate + "  "}</span>}
						{getNamePreviewDataArr("capacity") && <span>{Hashtag}{previewData.capacity + " куб. см" + "  "}</span>}
						{getNamePreviewDataArr("power") && <span>{Hashtag}{previewData.power + "  л.с." + "  "}</span>}
						{/*{getNamePreviewDataArr("wheel") && <span>{Hashtag}{"Руль: " + previewData.wheel + "  "}</span>}*/}
						{/*{getNamePreviewDataArr("category") && <span>{Hashtag}{"Категория ТС: " + previewData.category + "  "}</span>}*/}
						{/*{getNamePreviewDataArr("weight") && <span>{Hashtag}{"Вес: " + previewData.weight + " кг "}</span>}*/}
						{/*{getNamePreviewDataArr("engine_type") && <span>{Hashtag}{"Тип двигателя: " + previewData.engine_type + "  "}</span>}*/}
					</p>
					{getNamePreviewDataArr("image") && <img src={modifyUrl(previewData.image)} alt='photo' className='photo'/>}
				</Div>
				<Div className='textCenter'>
					<h3>В полном отчёте за {price}₽ доступно:</h3>
					<p>
						{Hashtag}пробег {Hashtag}регистрации {Hashtag}ДТП {Hashtag}ограничения {Hashtag}розыск {Hashtag}данные о залогах {Hashtag}диагностическая карта {Hashtag}ОСАГО {Hashtag}штрафы {Hashtag}фотографии {Hashtag}объявления о продаже {Hashtag}профили на drive2.ru {Hashtag}проверка на работу в такси {Hashtag}характеристики авто
					</p>
				</Div>

				<Div>
					<Button name="top" size="xl" onClick={getGibddHistory} >
						Купить полный отчёт
					</Button>
				</Div>
		</Group>
	</Panel>
}


export default PreviewHistiry;
