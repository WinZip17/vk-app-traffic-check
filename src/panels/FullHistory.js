import React from 'react';
import {platform, IOS, Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import HeaderButton from '@vkontakte/vkui/dist/components/HeaderButton/HeaderButton';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import dateformat from 'dateformat'
import dtp from "../img/svgDtp.svg";


const osName = platform();

const FullHistory = (props) => {
	const {id, go, gibddHistory, previewData} = props

	const getGibddHistoryDataArr = (object, name) => {
		let arr = []
		if (object) {
			for (let key in object) (
				arr.push(key)
			)
		}
		return arr.includes(name) && object[name] && object[name].length > 0
	}

	const getNamePreviewDataArr = (name) => {
		let arr = []
		if (previewData) {
			for (let key in previewData) (
				arr.push(key)
			)
		}
		return arr.includes(name) && previewData[name].length > 0
	}

	const getCircleColor = (length) => {
		if (length > 2) {
			return 'red_circle'
		} else if (length === 2) {
			return 'yellow_circle'
		} else if (length === 1) {
			return 'green_circle'
		}
		return ""
	}

	console.log(getGibddHistoryDataArr(gibddHistory.mileages, "status"))

	let wellDate = new Date();
	return <Panel id={id}>
		<PanelHeader
			left={<HeaderButton onClick={go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
			</HeaderButton>}
		>
			Полная история
		</PanelHeader>
		<Group>

			<Div><a href='#'>Скачать отчет</a></Div>
			<br/>
			<Div><h1>{getGibddHistoryDataArr(gibddHistory.history.gibdd_base.vehicle,"model") && gibddHistory.history.gibdd_base.vehicle.model}{getNamePreviewDataArr(gibddHistory.history.gibdd_base.vehicle, "year") && ", " + gibddHistory.history.gibdd_base.vehicle.year}</h1></Div>
			<Div>{"Дата проверки  " + dateformat(wellDate, 'dd.mm.yyyy')}</Div>
			{getGibddHistoryDataArr(gibddHistory, "VIN") && <Div><strong>{"VIN: " + gibddHistory.VIN}</strong></Div>}
			{getGibddHistoryDataArr(gibddHistory, "num") && <Div><strong>{"Гос. номер: " + gibddHistory.num}</strong></Div>}
			{getGibddHistoryDataArr(gibddHistory, "sts") && <Div><strong>{"СТС: " + gibddHistory.sts}</strong></Div>}
			{getNamePreviewDataArr("image") && <Div><img src={previewData.image} alt='photo' className='photo'/></Div>}
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

			<Div><p><strong>Сводные данные</strong></p></Div>
			<Div><span className={gibddHistory.history.status !== 200 ? getCircleColor(0) : getCircleColor(gibddHistory.history.gibdd_base.ownership_periods.length)}> </span> <i>Количество записей в ПТС: </i>{gibddHistory.history.status === 200 ? <span>{" " + gibddHistory.history.gibdd_base.ownership_periods.length}</span> : " нет информации"}</Div>
			<Div><span className={gibddHistory.dtp.status === 200 && gibddHistory.dtp.dtp.accidents.length > 0 ? getCircleColor(3) : getCircleColor(0)}> </span><i>ДТП: </i> {gibddHistory.dtp.status === 200 ? <span>{" " + gibddHistory.dtp.dtp.accidents.length}</span> : " 0"}</Div>
			<Div><i>Пробег: </i>{getGibddHistoryDataArr(gibddHistory.mileages, "status") && gibddHistory.mileages.status === 200 && gibddHistory.mileages.mileages.length > 0? <span>{gibddHistory.mileages.mileages[gibddHistory.mileages.mileages.length - 1].mileage / 1000}<span> тыс. км  </span> ({gibddHistory.mileages.mileages[gibddHistory.mileages.mileages.length - 1].date})</span> : " нет информации"}</Div>
			<Div><span className={gibddHistory.restrict.status === 200 && gibddHistory.restrict.restrict.length > 0 ? getCircleColor(3) : getCircleColor(0)}> </span><i>Ограничения ГИБДД: </i> {gibddHistory.restrict.status === 200 && gibddHistory.restrict.restrict.length > 0 ? <span>{gibddHistory.restrict.restrict[gibddHistory.restrict.restrict.length - 1].restrict_type + "  "} ({gibddHistory.restrict.restrict[gibddHistory.restrict.restrict.length - 1].restrict_osn + "  " + gibddHistory.restrict.restrict[gibddHistory.restrict.restrict.length - 1].region_name})</span>: " Нет"}</Div>
			<Div><span className={gibddHistory.zalogi.status !== 200 ? getCircleColor(1) : getCircleColor(3)}> </span><i>Залог: </i> {gibddHistory.zalogi.status === 200 ? <span>{gibddHistory.zalogi.zalogi.map((zalogi, index) => <div key={index}><p>В залоге {zalogi.pledgees} c {zalogi.register_date}</p></div>)}</span> : " нет"}</Div>
			<Div><span className={gibddHistory.wanted.status !== 200 ? getCircleColor(1) : getCircleColor(3)}> </span><i>Розыск: </i> {gibddHistory.wanted.status === 200 ? <span>{gibddHistory.wanted.wanted.map((wanted, index) => <div key={index}><p>В розыске с {wanted.date_add}, {wanted.region}</p></div>)}</span> : " нет"}</Div>
			<Div><span className={gibddHistory.fines && gibddHistory.fines.status !== 200 ? getCircleColor(1) : getCircleColor(3)}> </span><i>Неоплаченные штрафы: </i> {gibddHistory.fines && gibddHistory.fines.status === 200 ? <span>{gibddHistory.fines.fines_v2.length}</span> : " нет"}</Div>
			{gibddHistory.eaisto.status === 200 && <Div>{gibddHistory.eaisto.diagnose_cards.length === 1 ? <i>Диагностическая карта: </i>  : <i>Диагностические карты: </i>}<span>{gibddHistory.eaisto.diagnose_cards.map((wanted, index) => wanted.number.length > 0 && <span key={index}>№{wanted.number}{wanted.start_date.length > 0 && wanted.end_date.length > 0 && ", "} {wanted.start_date.length > 0 && wanted.start_date + " - "} {wanted.start_date.length > 0 && wanted.end_date + "  "}</span>)}</span></Div>}
			<Div><span className={gibddHistory.taxi && gibddHistory.taxi.status !== 200 ? getCircleColor(1) : getCircleColor(3)}> </span> <i> Такси: </i>{gibddHistory.taxi && gibddHistory.wanted.status === 200 ? "Да" : " нет"}</Div>
			{gibddHistory.rsa.status === 200 &&  <Div> <i>ОСАГО: </i>{gibddHistory.rsa.rsa.company_name}, серия {" " + gibddHistory.rsa.rsa.policy_serial + " "}№{gibddHistory.rsa.rsa.policy_number + " "} {gibddHistory.rsa.rsa.policy_status}</Div>}

			{gibddHistory.history.status === 200 && gibddHistory.history.gibdd_base.ownership_periods.length > 0 && <Div><p><strong>История записей в ПТС</strong></p> <div>
				{gibddHistory.history.gibdd_base.ownership_periods.map((ownership_periods, index) => <div key={index}><p>{index + 1 }) {ownership_periods.from.length > 0 && <span> {dateformat(ownership_periods.from, 'dd.mm.yyyy')} - </span>}{ownership_periods.to.length > 0 && <span> {ownership_periods.to === "Настоящее время" || ownership_periods.to === "н.в." ? ownership_periods.to : dateformat(ownership_periods.to, 'dd.mm.yyyy')}, </span>} {ownership_periods.simple_person_type.length > 0 && <span> {ownership_periods.simple_person_type === "Natural"? 'физическое лицо' : 'юридическое лицо'} </span>} </p></div>)}
			</div></Div>}

			{gibddHistory.dtp && getGibddHistoryDataArr(gibddHistory.dtp, "status") && gibddHistory.dtp.status === 200 && gibddHistory.dtp.dtp.accidents.length > 0 && <Div><div> <p><strong>История ДТП (ГИБДД)</strong></p></div>
				{gibddHistory.dtp.dtp.accidents.map((accidents, index) => <div key={index}>{index + 1 }) {" " + accidents.accident_type + ", "}{accidents.accident_date_time + ", "}{accidents.region_name + ""} <br/> </div>)}
			</Div>}

			{gibddHistory.imgs && getGibddHistoryDataArr(gibddHistory.imgs, "status") && gibddHistory.imgs.status === 200 && gibddHistory.imgs.photo.length > 0 && <Div><p><strong>Фото</strong></p> <div>
				{gibddHistory.imgs.photo.map((photo, index) => <div key={index}><p>{photo.date.length > 0 && dateformat(photo.date, 'dd.mm.yyyy') + "  "}<a target='_blank' href={photo.src}>Скачать</a></p> <img
					src={photo.src} alt='photo' className='photo'/> </div>)}
			</div></Div>}

			{gibddHistory.drive2 && getGibddHistoryDataArr(gibddHistory.drive2, "status") && gibddHistory.drive2.status === 200 && gibddHistory.drive2.drive2.length > 0 && <Div><p><strong>Профили на drive2.ru</strong></p> <div>
				{gibddHistory.drive2.drive2.map((drive2, index) => <div key={index}><p>{index + 1 })  <a href={drive2}> <u>{drive2}</u> </a></p></div>)}
			</div> </Div>}

			{gibddHistory.autoru && getGibddHistoryDataArr(gibddHistory.autoru, "status") && gibddHistory.autoru.status === 200 && gibddHistory.autoru.bulletin_boards.length > 0 && <Div><p><strong>Объявления о продаже</strong></p> <div>
				{gibddHistory.autoru.bulletin_boards.map((bulletin_boards, index) => <div key={index}><p>{index + 1 }) {bulletin_boards.date.length > 0 && <span> {bulletin_boards.date}, </span>}  {bulletin_boards.model.length > 0 && <span> {bulletin_boards.model} г.в., </span>} {bulletin_boards.mileage.length > 0 && <span> {bulletin_boards.mileage}, </span>} {bulletin_boards.price.length > 0 && <span> {bulletin_boards.price}, </span>} {bulletin_boards.link.length > 0 && <a href={bulletin_boards.link}> {bulletin_boards.link} </a>}</p></div>)}
			</div></Div>}

			{getGibddHistoryDataArr(gibddHistory.mileages, "status") &&  gibddHistory.mileages.status === 200 && gibddHistory.mileages.mileages.length > 0 && <Div><p><strong>История пробега</strong></p><div>
				{gibddHistory.mileages.mileages.map((mileages, index) => <div key={index}><p>{index + 1 }) {mileages.mileage / 1000}<span> тыс. км  </span> ({mileages.date})</p></div>)}
			</div> </Div>}

			{getGibddHistoryDataArr(gibddHistory.mileages, "status") &&  gibddHistory.fines.status === 200 && gibddHistory.fines.fines_v2.length > 0 && <Div><div> <p><strong>Список неоплаченных штрафов</strong></p></div>
				{gibddHistory.fines.fines_v2.map((fines, index) => <div key={index}><p>{index + 1 }) {"fine_posted" in fines ? `Штраф отправлен ${fines.date_post}` : `Нарушение от  ${fines.date_decis}`} {fines.koap_text.length > 0 && fines.koap_text} {fines.div_addr.length > 0 && fines.div_addr} {fines.summa.length > 0 && fines.summa + " ₽"}</p></div>)}
			</Div>}

		</Group>
	</Panel>
}

// <img src={dtp} alt='dtp' />
export default FullHistory;
