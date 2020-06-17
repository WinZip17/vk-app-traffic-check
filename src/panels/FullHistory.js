import React, {useEffect, useState} from 'react';
import {platform, IOS, Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
//eslint-disable-next-line import/no-webpack-loader-syntax
import Svg2 from 'react-svg-loader!../img/svg.html';
//eslint-disable-next-line import/no-webpack-loader-syntax
import SvgBig from 'react-svg-loader!../img/big-svg.html';
//eslint-disable-next-line import/no-webpack-loader-syntax
import SvgBus from 'react-svg-loader!../img/bus-svg.html';
import {damageClass, getCircleColor, getGibddHistoryDataArr, modifyUrl, newDateFormat} from "../util";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';


export const getNewUrlImg = (url) => {
	let index = url.split("map=")
	return `https://check.gibdd.ru/proxy/check/auto/images/cache/${index[1]}.png`
}

const osName = platform();

const getSVG = (history, damage) => {
	let category = getGibddHistoryDataArr(history,"category") ? history.category : "B"
	if (category === "C") {
		return <SvgBig className={`svg-margin ${damageClass(damage)}`}/>
	} else if (category === "D") {
		return <SvgBus className={`svg-margin ${damageClass(damage)}`}/>
	} else {
		return <Svg2 className={`svg-margin ${damageClass(damage)}`}/>
	}
}


const FullHistory = (props) => {
	const {id,  isPreview, isOldHistory, oldHistoryArr, idHistory, setActiveStory, setHeight} = props

	//infoArr
	const [previewData, setPreviewData] = useState(undefined);
	const [gibddHistory, setGibddHistory] = useState(undefined);

	useEffect(() => {
		setHeight(4050)
	}, []);

	useEffect(() => {
		if (isOldHistory && idHistory !== null) {
			setPreviewData(oldHistoryArr[idHistory].preview)
			setGibddHistory(oldHistoryArr[idHistory])
		} else if (props.gibddHistory) {
			setPreviewData(props.gibddHistory.preview)
			setGibddHistory(props.gibddHistory)
		}
	}, [oldHistoryArr, props.gibddHistory]);


	//data
	const [model, setModel] = useState(null);
	const [VIN, setVIN] = useState(null);
	const [num, setNum] = useState(null);
	const [sts, setSts] = useState(null);
	const [image, setImage] = useState(null);
	const [category, setCategory] = useState(null);
	const [year, setYear] = useState(null);
	const [color, setColor] = useState(null);
	const [wheel, setWheel] = useState(null);
	const [weight, setWeight] = useState(null);
	const [type, setType] = useState(null);
	const [capacity, setCapacity] = useState(null);
	const [power, setPower] = useState(null);
	const [engine_number, setEngine_number] = useState(null);
	const [engine_type, setEngine_type] = useState(null);
	const [ptsCount, setPtsCount] = useState(null);
	const [dtpCount, setDtpCount] = useState(null);
	const [mileages, setMileages] = useState(null);
	const [restrict, setRestrict] = useState(null);
	const [zalogi, setZalogi] = useState(null);
	const [wanted, setWanted] = useState(null);
	const [diagnose_cards, setDiagnose_cards] = useState(null);
	const [taxi, setTaxi] = useState(false);
	const [rsa, setRsa] = useState(null);

	//разделы - массивы
	const [ownership_periodsArr, setOwnership_periods] = useState([]);
	const [dtpArr, setDtpArr] = useState([]);
	const [imgsArr, setImgsArr] = useState([]);
	const [drive2Arr, setDrive2Arr] = useState([]);
	const [autoruArr, setAutoruArr] = useState([]);
	const [newFinesArr, setNewFinesArr] = useState([]);


	const getNamePreviewDataArr = (name) => {
		let arr = []
		if (gibddHistory && gibddHistory.preview) {
			for (let key in gibddHistory.preview) (
				arr.push(key)
			)
		}
		return arr.includes(name) && gibddHistory.preview[name].length > 0
	}

	let wellDate = new Date();

	useEffect(() => {
		if (gibddHistory) {
			//model
			if (getNamePreviewDataArr("model")) {
				setModel(gibddHistory.preview.model)
			} else if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle,"model")) {
				setModel(gibddHistory.history.gibdd_base.vehicle.model)
			}

			//year
			if (getNamePreviewDataArr("year")) {
				setYear(gibddHistory.preview.year)
			} else if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "year")) {
				setYear(gibddHistory.history.gibdd_base.vehicle.year)
			}

			//VIN
			if  (getGibddHistoryDataArr(gibddHistory, "VIN")) {
				setVIN(gibddHistory.VIN)
			}

			//num
			if  (getGibddHistoryDataArr(gibddHistory, "num")) {
				setNum(gibddHistory.num)
			}

			//sts
			if  (getGibddHistoryDataArr(gibddHistory, "sts")) {
				setSts(gibddHistory.sts)
			}


			//image
			if (getNamePreviewDataArr("image")) {
				setImage(gibddHistory.preview.image)
			}

			//category
			if (getNamePreviewDataArr("category")) {
				setCategory(gibddHistory.preview.category)
			} else if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "category")) {
				setCategory(gibddHistory.history.gibdd_base.vehicle.category)
			}

			//color
			if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "color")) {
				setColor(gibddHistory.history.gibdd_base.vehicle.color)
			}

			//wheel
			if (getNamePreviewDataArr("wheel")) {
				setWheel(gibddHistory.preview.wheel)
			} else if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "wheel")) {
				setWheel(gibddHistory.history.gibdd_base.vehicle.wheel)
			}

			//weight
			if (getNamePreviewDataArr("weight")) {
				setWeight(gibddHistory.preview.weight)
			} else if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "weight")) {
				setWeight(gibddHistory.history.gibdd_base.vehicle.weight)
			}


			//type
			if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "type")) {
				setType(gibddHistory.history.gibdd_base.vehicle.type)
			}

			//capacity
			if (getNamePreviewDataArr("capacity")) {
				setCapacity(gibddHistory.preview.capacity)
			} else if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "engine_volume")) {
				setCapacity(gibddHistory.history.gibdd_base.vehicle.engine_volume)
			}

			//power
			if (getNamePreviewDataArr("power")) {
				setPower(gibddHistory.preview.power)
			} else if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "power_hp")) {
				setPower(gibddHistory.history.gibdd_base.vehicle.power_hp)
			}

			//engine_number
			if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "engine_number")) {
				setEngine_number(gibddHistory.history.gibdd_base.vehicle.engine_number)
			}



			//engine_type
			if (getNamePreviewDataArr("engine_type")) {
				setEngine_type(gibddHistory.preview.engine_type)
			}


			//PtsCount ownership_periodsArr
			if (gibddHistory.history.status === 200 && getGibddHistoryDataArr(gibddHistory.history.gibdd_base, "ownership_periods")) {
				setPtsCount(gibddHistory.history.gibdd_base.ownership_periods.length)
				setOwnership_periods(gibddHistory.history.gibdd_base.ownership_periods)
			}


			//dtpCount dtpArr
			if (gibddHistory.dtp.status === 200 && getGibddHistoryDataArr(gibddHistory.dtp.dtp, "accidents")) {
				setDtpCount(gibddHistory.dtp.dtp.accidents.length)
				setDtpArr(gibddHistory.dtp.dtp.accidents)
			}


			//mileages
			if (gibddHistory.mileages.status === 200 && gibddHistory.mileages.mileages.length > 0) {
				setMileages(gibddHistory.mileages.mileages)
			}


			//restrict
			if (gibddHistory.restrict.status === 200 && gibddHistory.restrict.restrict.length > 0) {
				setRestrict(gibddHistory.restrict.restrict)
			}


			//zalogi
			if (gibddHistory.zalogi.status === 200 && gibddHistory.zalogi.zalogi.length > 0) {
				setZalogi(gibddHistory.zalogi.zalogi)
			}

			//wanted
			if (gibddHistory.wanted.status === 200 && gibddHistory.wanted.wanted.length > 0) {
				setWanted(gibddHistory.wanted.wanted)
			}

			//eaisto
			if (gibddHistory.eaisto.status === 200 && gibddHistory.eaisto.diagnose_cards.length > 0) {
				setDiagnose_cards(gibddHistory.eaisto.diagnose_cards)
			}

			//taxi
			if (gibddHistory.taxi.status === 200) {
				setTaxi(true)
			}


			//rsa
			if (gibddHistory.rsa.status === 200) {
				setRsa(gibddHistory.rsa.rsa)
			}

			//imgs
			if (gibddHistory.imgs.status === 200 && gibddHistory.imgs.photo.length > 0) {
				setImgsArr(gibddHistory.imgs.photo)
			}


			//drive2Arr
			if (gibddHistory.drive2.status === 200 && gibddHistory.drive2.drive2.length > 0) {
				setDrive2Arr(gibddHistory.drive2.drive2)
			}

			//autoruArr
			if (gibddHistory.autoru.status === 200 && gibddHistory.autoru.bulletin_boards.length > 0) {
				setAutoruArr(gibddHistory.autoru.bulletin_boards)
			}

			//newFinesArr
			if (gibddHistory.fines.status === 200 && gibddHistory.fines.fines_v2.length > 0) {
				let fines = []
				for (let i=0; i < gibddHistory.fines.fines_v2.length; i++) {
					if ("status" in gibddHistory.fines.fines_v2[i] && gibddHistory.fines.fines_v2[i]. status === 1) {

					} else {
						fines.push(gibddHistory.fines.fines_v2[i])
					}
				}
				setNewFinesArr(fines)
			}
		}
	}, [gibddHistory]);


	const getPanelHeader = () => {
		let text
		let story
		if (isPreview) {
			text = 'Пример отчёта'
			story = 'home'
		} else if (isOldHistory) {
			text = 'Отчёт'
			story = 'my-checks'
		} else {
			text = 'Отчёт'
			story = 'home'
		}
		return <PanelHeader
			left={<PanelHeaderButton onClick={() => {
				setActiveStory(story)
			}}>
				{osName === IOS ? <Icon28ChevronBack className="pointer"/> : <Icon24Back className="pointer"/>}
			</PanelHeaderButton>}>{text}</PanelHeader>
	}

	return <Panel id={id}>
		{getPanelHeader()}

		{gibddHistory && <Group>

			<Div><h1>{model}{year && ", " + year}</h1></Div>
			<Div>Дата проверки  {isOldHistory ? gibddHistory.date : newDateFormat(wellDate)}</Div>
			{VIN && <Div><span className='text-bold'>{`${VIN.length === 17 ? "VIN: " : "Кузов: "}` + VIN}</span></Div>}
			{num && <Div><span className='text-bold'>{"Госномер: " + num}</span></Div>}
			{sts && <Div><span className='text-bold'>{"СТС: " + sts}</span></Div>}
			{image && <Div><img src={modifyUrl(image)} alt='photo' className='photo'/></Div>}
			{category && <Div><span><i>Категория ТС: </i>{category}</span></Div>}
			{year && <Div><span><i>Год выпуска: </i>{year}</span></Div>}
			{color && <Div><span><i>Цвет: </i>{color}</span></Div>}
			{wheel && <Div><span><i>Руль: </i>{wheel}</span></Div>}
			{weight && <Div><span><i>Масса (без нагрузки/макс. разр.): </i>{weight}</span></Div>}
			{type && <Div><span><i>Тип кузова: </i>{type}</span></Div>}
			{capacity && <Div><span><i>Объем двигателя: : </i>{capacity + " куб. см"}</span></Div>}
			{power && <Div><span><i>Мощность двигателя: </i>{power + " л.c."}</span></Div> }
			{engine_number && <Div><span><i>№ двигателя: </i>{engine_number}</span></Div>}
			{engine_type && <Div><span><i>Тип двигателя: </i>{engine_type}</span></Div>}

			<Div>
				<p className='fix-margin'><span className='text-bold'>Сводные данные</span></p>
				{ptsCount && <p><span className={!ptsCount ? getCircleColor(0) : getCircleColor(ptsCount)}> </span> <i>Количество записей в ПТС: </i><span>{" " + ptsCount}</span></p>}
				{gibddHistory.dtp.status !== 202  && <p><span className={dtpCount && dtpCount > 0 ? getCircleColor(3) : getCircleColor(1)}> </span><i>ДТП: </i> {dtpCount && dtpCount > 0  ? <span>{" " + dtpCount}</span> : " 0"}</p>}
				{mileages && <p><i>Пробег: </i><span>{mileages[gibddHistory.mileages.mileages.length - 1].mileage / 1000}<span> тыс. км  </span> ({mileages[gibddHistory.mileages.mileages.length - 1].date})</span></p>}
				{gibddHistory.restrict.status !== 202 && <p><span className={restrict ? getCircleColor(3) : getCircleColor(1)}> </span><i>Ограничения ГИБДД: </i> {restrict ? <span>{restrict[restrict.length - 1].restrict_type + "  "} ({restrict[restrict.length - 1].restrict_osn + "  " + restrict[restrict.length - 1].region_name})</span>: " Нет"}</p>}
				<p><span className={zalogi ? getCircleColor(3) : getCircleColor(1)}> </span><i>Залог: </i> {zalogi ? <span>{zalogi.map((zalogi, index) => <div key={index}><p>В залоге {zalogi.pledgees} c {zalogi.register_date}</p></div>)}</span> : " Нет"}</p>
				{gibddHistory.wanted.status !== 202 && <p><span className={wanted ? getCircleColor(3) : getCircleColor(1)}> </span><i>Розыск: </i> {wanted ? <span>{wanted.map((wanted, index) => <div key={index}><span>В розыске с {wanted.date_add}, {wanted.region}</span></div>)}</span> : " Нет"}</p>}
				<p><span className={newFinesArr.length > 0 ? getCircleColor(3) : getCircleColor(1)}> </span><i>Неоплаченные штрафы: </i> {newFinesArr.length > 0 ? <span>{newFinesArr.length}</span> : " 0"}</p>
				{diagnose_cards && <p>{diagnose_cards.length === 1 ? <i>Диагностическая карта: </i>  : <i>Диагностические карты: </i>}<span>{diagnose_cards.map((card, index) => card.number.length > 0 && <span key={index}>№{card.number}{card.start_date.length > 0 && card.end_date.length > 0 && ", "} {card.start_date.length > 0 && card.start_date + " - "} {card.start_date.length > 0 && card.end_date + "  "}</span>)}</span></p>}
				<p><span className={taxi ? getCircleColor(3) : getCircleColor(1)}> </span> <i> Такси: </i>{taxi ? "Да" : " Нет"}</p>
				{rsa &&  <p> <i>ОСАГО: </i>{rsa.company_name}, серия {" " + rsa.policy_serial + " "}№{rsa.policy_number + " "} {rsa.policy_status}</p>}
			</Div>

			{ownership_periodsArr.length > 0 && <Div><p><span className='text-bold'>История записей в ПТС</span></p> <div>
				{ownership_periodsArr.map((ownership_periods, index) => <div key={index}><p>{index + 1 }) {ownership_periods.from.length > 0 && <span> {newDateFormat(ownership_periods.from)} - </span>}{ownership_periods.to.length > 0 && <span> {ownership_periods.to === "Настоящее время" || ownership_periods.to === "н.в." ? ownership_periods.to : newDateFormat(ownership_periods.to)}, </span>} {ownership_periods.simple_person_type.length > 0 && <span> {ownership_periods.simple_person_type === "Natural"? 'физическое лицо' : 'юридическое лицо'} </span>} </p></div>)}
			</div></Div>}

			{dtpArr.length > 0 && <Div><div> <p><span className='text-bold'>История ДТП (ГИБДД)</span></p></div>
				{dtpArr.map((accidents, index) => <div key={index}>{index + 1 }) {" " + accidents.accident_type + ", "}{accidents.accident_date_time + ", "}{accidents.region_name}{accidents.damage_image.length > 0 && <span>, <a target='_blank' href={accidents.damage_image}>схема повреждений</a></span>  } </div>)}
			</Div>}

			{mileages && <Div><p><span className='text-bold'>История пробега</span></p><div>
				{mileages.map((mileages, index) => <div key={index}><p>{index + 1 }) {mileages.mileage / 1000}<span> тыс. км  </span> ({mileages.date})</p></div>)}
			</div> </Div>}


			{imgsArr.length > 0 && <Div><p><span className='text-bold'>Фото</span></p> <div>
				{imgsArr.map((photo, index) => <div key={index}><p>{index + 1 }) {photo.date.length > 0 && newDateFormat(photo.date)}</p> <img
					src={modifyUrl(photo.src)} alt='photo' className='photo'/> </div>)}
			</div></Div>}

			{drive2Arr.length > 0 && <Div><p><span className='text-bold'>Профили на drive2.ru</span></p> <div>
				{drive2Arr.map((drive2, index) => <div key={index}><p>{index + 1 })  <a className='font-style-normal' href={drive2}> {drive2} </a></p></div>)}
			</div> </Div>}

			{autoruArr.length > 0 && <Div><p><span className='text-bold'>Объявления о продаже</span></p> <div>
				{autoruArr.map((bulletin_boards, index) => <div key={index}><p>{index + 1 }) {bulletin_boards.date.length > 0 && <span> {bulletin_boards.date}, </span>}  {bulletin_boards.model.length > 0 && <span> {bulletin_boards.model} г.в., </span>} {bulletin_boards.mileage.length > 0 && <span> {bulletin_boards.mileage.replace(/&nbsp;/g, ' ')}, </span>} {bulletin_boards.price.length > 0 && <span> {bulletin_boards.price.replace(/&nbsp;/g, ' ')}, </span>} {bulletin_boards.link.length > 0 && <a className='font-style-normal' href={bulletin_boards.link}> {bulletin_boards.link} </a>}</p></div>)}
			</div></Div>}

			{newFinesArr.length > 0 && <Div><div> <p><span className='text-bold'>Список неоплаченных штрафов</span></p></div>
				{newFinesArr.map((fines, index) => <div key={index}><p>{index + 1 }) {"date_post" in fines && `Штраф отправлен ${fines.date_post}`}{"date_decis" in fines && `, Нарушение от ${fines.date_decis}`}{"koap_text" in fines && fines.koap_text.length > 0 && ", " + fines.koap_text}{"div_addr" in fines && fines.div_addr.length > 0 && ", " + fines.div_addr}{fines.summa.toString().length > 0 && <span>, <span className='text-bold'>{fines.summa} ₽</span></span>}</p></div>)}
			</Div>}

		</Group>}
	</Panel>
}

export default FullHistory;
