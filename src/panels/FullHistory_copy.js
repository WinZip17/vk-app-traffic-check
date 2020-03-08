import React, {useEffect, useState} from 'react';
import {platform, IOS, Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
//eslint-disable-next-line import/no-webpack-loader-syntax
import Svg2 from 'react-svg-loader!../img/svg.html';
//eslint-disable-next-line import/no-webpack-loader-syntax
import SvgBig from 'react-svg-loader!../img/big-svg.html';
//eslint-disable-next-line import/no-webpack-loader-syntax
import SvgBus from 'react-svg-loader!../img/bus-svg.html';
import {damageClass, getCircleColor, getGibddHistoryDataArr, getNewArrFines, modifyUrl, newDateFormat} from "../util";
import {Menu} from "../Menu";
import {get_name_browser} from "../App";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";

export const getNewUrlImg = (url) => {
	let index = url.split("map=")
	return `https://check.gibdd.ru/proxy/check/auto/images/cache/${index[1]}.png`
}

const osName = platform();

const getSVG = (history, damage) => {
	let category = getGibddHistoryDataArr(history,"category") ? history.category : "B"
	console.log(category)

	if (category === "C") {
		return <SvgBig className={`svg-margin ${damageClass(damage)}`}/>
	} else if (category === "D") {
		return <SvgBus className={`svg-margin ${damageClass(damage)}`}/>
	} else {
		return <Svg2 className={`svg-margin ${damageClass(damage)}`}/>
	}
}


const FullHistory = (props) => {
	const {id,  previousPanel, isPreview, setActivePanel, setHeight, getPreviewReport, activePanel,
		isMobPlatform, setPopout, myParam, isOldHistory, oldHistoryArr, idHistory} = props

	//infoArr
	const [previewData, setPreviewData] = useState(undefined);
	const [gibddHistory, setGibddHistory] = useState(undefined);


	useEffect(() => {
		if (isOldHistory && idHistory !== null) {
			setPreviewData(oldHistoryArr[idHistory].preview)
			setGibddHistory(oldHistoryArr[idHistory])
		} else if (props.gibddHistory) {
			setPreviewData(props.gibddHistory.preview)
			setPreviewData(props.gibddHistory)
		}
	}, [oldHistoryArr, props.gibddHistory]);


	//data
	const [model, setModel] = useState(null);
	const [verificationDate, setVerificationDate] = useState(null);
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
	const [zalogiCount, setZalogiCount] = useState(null);
	const [wantedCount, setWantedCount] = useState(null);
	const [newFinesCount, setNewFinesCount] = useState(null);
	const [diagnose_cards, setDiagnose_cards] = useState(null);
	const [taxiCount, setTaxiCount] = useState(null);
	const [rsa, setRsa] = useState(null);

	//разделы - массивы
	const [dtpArr, setDtpArr] = useState([]);
	const [mileagesArr, setMileagesArr] = useState([]);
	const [imgsArr, setImgsArr] = useState([]);
	const [drive2Arr, setDrive2Arr] = useState([]);
	const [autoruArr, setAutoruArr] = useState([]);
	const [newFinesArr, setNewFinesArr] = useState([]);







	let [newFines, setNewFines] = useState([]);

	const groupClass = `${get_name_browser() ? "fix-menu-group-mozilla" : "fix-menu-group" }`
	useEffect(() => {
		setHeight(4000)
	}, []);

	useEffect(() => {
		if (gibddHistory && getGibddHistoryDataArr(gibddHistory.fines, "status") &&  gibddHistory.fines.status === 200 && gibddHistory.fines.fines_v2.length > 0) {
			setNewFines(getNewArrFines(gibddHistory.fines.fines_v2))
		}
	}, [gibddHistory]);

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
		}
	}, [gibddHistory]);


	console.log(getNamePreviewDataArr('model'))
	console.log(model)
	return <Panel id={id}>
		{!isPreview ? <PanelHeader
			left={<PanelHeaderButton onClick={() => {
				setActivePanel(previousPanel)
				setHeight(2000)
			}}>
				{osName === IOS ? <Icon28ChevronBack className="pointer" /> : <Icon24Back className="pointer" />}
			</PanelHeaderButton>}
		>
			История автомобиля
		</PanelHeader>
		 : 		<PanelHeader noShadow={true}><a target="_BLANK" className='panel-header-link' href="https://xn----8sbbfchakv0a5blnd.xn--p1ai/">ГИБДД-проверка.рф</a></PanelHeader>
		}

		{isPreview && <Menu myParam={myParam} getPreviewReport={getPreviewReport} activePanel={activePanel} setActivePanel={setActivePanel} isMobPlatform={isMobPlatform} setPopout={setPopout}/>}


		{previewData && gibddHistory && <Group className={!isPreview ? "" : groupClass}>

			<Div><h1>{model}{getNamePreviewDataArr("year") && ", " + previewData.year}</h1></Div>
			<Div>Дата проверки  {isOldHistory ? gibddHistory.date : newDateFormat(wellDate)}</Div>
			{getGibddHistoryDataArr(gibddHistory, "VIN") && <Div><span className='text-bold'>{`${gibddHistory.VIN.length === 17? "VIN: " : "Кузов: "}` + gibddHistory.VIN}</span></Div>}
			{getGibddHistoryDataArr(gibddHistory, "num") && <Div><span className='text-bold'>{"Госномер: " + gibddHistory.num}</span></Div>}
			{getGibddHistoryDataArr(gibddHistory, "sts") && <Div><span className='text-bold'>{"СТС: " + gibddHistory.sts}</span></Div>}
			{getNamePreviewDataArr("image") && <Div><img src={modifyUrl(previewData.image)} alt='photo' className='photo'/></Div>}
			{getNamePreviewDataArr("category") && <Div><span><i>Категория ТС: </i>{previewData.category + "  "}</span></Div>}
			{getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "year") && <Div><span><i>Год выпуска: </i>{gibddHistory.history.gibdd_base.vehicle.year}</span></Div>}
			{getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "color") && <Div><span><i>Цвет: </i>{gibddHistory.history.gibdd_base.vehicle.color}</span></Div>}
			{getNamePreviewDataArr("wheel") && <Div><span><i>Руль: </i>{previewData.wheel}</span></Div>}
			{getNamePreviewDataArr("weight") && <Div><span><i>Масса (без нагрузки/макс. разр.): </i>{previewData.weight}</span></Div>}
			{getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "type") && <Div><span><i>Тип кузова: </i>{gibddHistory.history.gibdd_base.vehicle.type}</span></Div>}
			{getNamePreviewDataArr("capacity") ? <Div><span><i>Объем двигателя: : </i>{previewData.capacity + " куб. см"}</span></Div> : getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "engine_volume") && <Div><span>{"Объем двигателя: " + gibddHistory.history.gibdd_base.vehicle.engine_volume + " куб. см"}</span></Div>}
			{getNamePreviewDataArr("power") ? <Div><span><i>Мощность двигателя: </i>{previewData.power + " л.c."}</span></Div> : getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "power_hp") && <Div><span>{"Мощность двигателя: " + gibddHistory.history.gibdd_base.vehicle.power_hp + " л.c."}</span></Div>}
			{getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle, "engine_number") && <Div><span><i>№ двигателя: </i>{gibddHistory.history.gibdd_base.vehicle.engine_number}</span></Div>}
			{getNamePreviewDataArr("engine_type") && <Div><span><i>Тип двигателя: </i>{previewData.engine_type}</span></Div>}

			<Div>
				<p className='fix-margin'><span className='text-bold'>Сводные данные</span></p>
				{gibddHistory.history && gibddHistory.history.status === 200 && <p><span className={gibddHistory.history.status !== 200 ? getCircleColor(0) : getCircleColor(gibddHistory.history.gibdd_base.ownership_periods.length)}> </span> <i>Количество записей в ПТС: </i>{gibddHistory.history.status === 200 ? <span>{" " + gibddHistory.history.gibdd_base.ownership_periods.length}</span> : " нет информации"}</p>}
				{gibddHistory.dtp && <p><span className={gibddHistory.dtp.status === 200 && gibddHistory.dtp.dtp.accidents.length > 0 ? getCircleColor(3) : getCircleColor(1)}> </span><i>ДТП: </i> {gibddHistory.dtp.status === 200 ? <span>{" " + gibddHistory.dtp.dtp.accidents.length}</span> : " 0"}</p>}
				{gibddHistory.mileages && gibddHistory.mileages.status === 200 && <p><i>Пробег: </i>{getGibddHistoryDataArr(gibddHistory.mileages, "status") && gibddHistory.mileages.status === 200 && gibddHistory.mileages.mileages.length > 0? <span>{gibddHistory.mileages.mileages[gibddHistory.mileages.mileages.length - 1].mileage / 1000}<span> тыс. км  </span> ({gibddHistory.mileages.mileages[gibddHistory.mileages.mileages.length - 1].date})</span> : " нет информации"}</p>}
				{gibddHistory.restrict && gibddHistory.restrict.status === 200 && <p><span className={gibddHistory.restrict.status === 200 && gibddHistory.restrict.restrict.length > 0 ? getCircleColor(3) : getCircleColor(1)}> </span><i>Ограничения ГИБДД: </i> {gibddHistory.restrict.status === 200 && gibddHistory.restrict.restrict.length > 0 ? <span>{gibddHistory.restrict.restrict[gibddHistory.restrict.restrict.length - 1].restrict_type + "  "} ({gibddHistory.restrict.restrict[gibddHistory.restrict.restrict.length - 1].restrict_osn + "  " + gibddHistory.restrict.restrict[gibddHistory.restrict.restrict.length - 1].region_name})</span>: " Нет"}</p>}
				{gibddHistory.zalogi &&  <p><span className={gibddHistory.zalogi.status !== 200 ? getCircleColor(1) : getCircleColor(3)}> </span><i>Залог: </i> {gibddHistory.zalogi.status === 200 ? <span>{gibddHistory.zalogi.zalogi.map((zalogi, index) => <div key={index}><p>В залоге {zalogi.pledgees} c {zalogi.register_date}</p></div>)}</span> : " Нет"}</p>}
				{gibddHistory.wanted && <p><span className={gibddHistory.wanted.status !== 200 ? getCircleColor(1) : getCircleColor(3)}> </span><i>Розыск: </i> {gibddHistory.wanted.status === 200 ? <span>{gibddHistory.wanted.wanted.map((wanted, index) => <div key={index}><span>В розыске с {wanted.date_add}, {wanted.region}</span></div>)}</span> : " Нет"}</p>}
				<p><span className={newFines && newFines.length > 0 ? getCircleColor(3) : getCircleColor(1)}> </span><i>Неоплаченные штрафы: </i> {newFines && newFines.length > 0 ? <span>{newFines.length}</span> : " 0"}</p>
				{gibddHistory.eaisto && gibddHistory.eaisto.status === 200 && <p>{gibddHistory.eaisto.diagnose_cards.length === 1 ? <i>Диагностическая карта: </i>  : <i>Диагностические карты: </i>}<span>{gibddHistory.eaisto.diagnose_cards.map((wanted, index) => wanted.number.length > 0 && <span key={index}>№{wanted.number}{wanted.start_date.length > 0 && wanted.end_date.length > 0 && ", "} {wanted.start_date.length > 0 && wanted.start_date + " - "} {wanted.start_date.length > 0 && wanted.end_date + "  "}</span>)}</span></p>}
				{gibddHistory.taxi && <p><span className={gibddHistory.taxi && gibddHistory.taxi.status === 200 ? getCircleColor(3) : getCircleColor(1)}> </span> <i> Такси: </i>{gibddHistory.taxi && gibddHistory.taxi.status === 200 ? "Да" : " Нет"}</p>}
				{gibddHistory.rsa && gibddHistory.rsa.status === 200 &&  <p> <i>ОСАГО: </i>{gibddHistory.rsa.rsa.company_name}, серия {" " + gibddHistory.rsa.rsa.policy_serial + " "}№{gibddHistory.rsa.rsa.policy_number + " "} {gibddHistory.rsa.rsa.policy_status}</p>}
			</Div>

			{gibddHistory.history && gibddHistory.history.status === 200 && gibddHistory.history.gibdd_base.ownership_periods.length > 0 && <Div><p><span className='text-bold'>История записей в ПТС</span></p> <div>
				{gibddHistory.history.gibdd_base.ownership_periods.map((ownership_periods, index) => <div key={index}><p>{index + 1 }) {ownership_periods.from.length > 0 && <span> {newDateFormat(ownership_periods.from)} - </span>}{ownership_periods.to.length > 0 && <span> {ownership_periods.to === "Настоящее время" || ownership_periods.to === "н.в." ? ownership_periods.to : newDateFormat(ownership_periods.to)}, </span>} {ownership_periods.simple_person_type.length > 0 && <span> {ownership_periods.simple_person_type === "Natural"? 'физическое лицо' : 'юридическое лицо'} </span>} </p></div>)}
			</div></Div>}

			{gibddHistory.dtp && getGibddHistoryDataArr(gibddHistory.dtp, "status") && gibddHistory.dtp.status === 200 && gibddHistory.dtp.dtp.accidents.length > 0 && <Div><div> <p><span className='text-bold'>История ДТП (ГИБДД)</span></p></div>
				{gibddHistory.dtp.dtp.accidents.map((accidents, index) => <div key={index}>{index + 1 }) {" " + accidents.accident_type + ", "}{accidents.accident_date_time + ", "}{accidents.region_name + ""} <br/> {accidents.damage_image.length === 0 && accidents.damage_points.length > 0 && getSVG(previewData, accidents.damage_points) } {accidents.damage_image.length > 0 && <img className='img-margin' src={getNewUrlImg(accidents.damage_image[0])} alt='damage' />} </div>)}
			</Div>}

			{gibddHistory.mileages && getGibddHistoryDataArr(gibddHistory.mileages, "status") &&  gibddHistory.mileages.status === 200 && gibddHistory.mileages.mileages.length > 0 && <Div><p><span className='text-bold'>История пробега</span></p><div>
				{gibddHistory.mileages.mileages.map((mileages, index) => <div key={index}><p>{index + 1 }) {mileages.mileage / 1000}<span> тыс. км  </span> ({mileages.date})</p></div>)}
			</div> </Div>}


			{gibddHistory.imgs && getGibddHistoryDataArr(gibddHistory.imgs, "status") && gibddHistory.imgs.status === 200 && gibddHistory.imgs.photo.length > 0 && <Div><p><span className='text-bold'>Фото</span></p> <div>
				{gibddHistory.imgs.photo.map((photo, index) => <div key={index}><p>{index + 1 }) {photo.date.length > 0 && newDateFormat(photo.date)}</p> <img
					src={modifyUrl(photo.src)} alt='photo' className='photo'/> </div>)}
			</div></Div>}

			{gibddHistory.drive2 && getGibddHistoryDataArr(gibddHistory.drive2, "status") && gibddHistory.drive2.status === 200 && gibddHistory.drive2.drive2.length > 0 && <Div><p><span className='text-bold'>Профили на drive2.ru</span></p> <div>
				{gibddHistory.drive2.drive2.map((drive2, index) => <div key={index}><p>{index + 1 })  <a className='font-style-normal' href={drive2}> {drive2} </a></p></div>)}
			</div> </Div>}

			{gibddHistory.autoru && getGibddHistoryDataArr(gibddHistory.autoru, "status") && gibddHistory.autoru.status === 200 && gibddHistory.autoru.bulletin_boards.length > 0 && <Div><p><span className='text-bold'>Объявления о продаже</span></p> <div>
				{gibddHistory.autoru.bulletin_boards.map((bulletin_boards, index) => <div key={index}><p>{index + 1 }) {bulletin_boards.date.length > 0 && <span> {bulletin_boards.date}, </span>}  {bulletin_boards.model.length > 0 && <span> {bulletin_boards.model} г.в., </span>} {bulletin_boards.mileage.length > 0 && <span> {bulletin_boards.mileage.replace(/&nbsp;/g, ' ')}, </span>} {bulletin_boards.price.length > 0 && <span> {bulletin_boards.price.replace(/&nbsp;/g, ' ')}, </span>} {bulletin_boards.link.length > 0 && <a className='font-style-normal' href={bulletin_boards.link}> {bulletin_boards.link} </a>}</p></div>)}
			</div></Div>}

			{newFines && newFines.length > 0 && <Div><div> <p><span className='text-bold'>Список неоплаченных штрафов</span></p></div>
				{newFines.map((fines, index) => <div key={index}><p>{index + 1 }) {"date_post" in fines && `Штраф отправлен ${fines.date_post}`}{"date_decis" in fines && `, Нарушение от ${fines.date_decis}`}{"koap_text" in fines && fines.koap_text.length > 0 && ", " + fines.koap_text}{"div_addr" in fines && fines.div_addr.length > 0 && ", " + fines.div_addr}{fines.summa.toString().length > 0 && <span>, <span className='text-bold'>{fines.summa} ₽</span></span>}</p></div>)}
			</Div>}

		</Group>}
	</Panel>
}

export default FullHistory;
