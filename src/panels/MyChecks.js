import React, {useEffect, useState} from 'react';
import { Group, List} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Avatar from "@vkontakte/vkui/dist/es6/components/Avatar/Avatar";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import {getGibddHistoryDataArr, getPhoto, getYear} from "../util";
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import Alert from "@vkontakte/vkui/dist/components/Alert/Alert";

const MyChecks = (props) => {
	const {id, setActiveStory, setPreviousPanel,
		getOldHistory, oldHistoryArr, popout, setIdHistory, setIsOldHistory, setPopout} = props

	const [oldHistoryArrRevers, seOldHistoryArrRevers] = useState([]);
	useEffect(() => {
		setPreviousPanel(id)
		getOldHistory()
	}, []);

	useEffect(() => {
		oldHistoryArr && seOldHistoryArrRevers(oldHistoryArr.reverse())
	}, [oldHistoryArr]);

	return <Panel id={id}>
		<PanelHeader><a target="_BLANK" className='panel-header-link' href="https://xn----8sbbfchakv0a5blnd.xn--p1ai/">ГИБДД-проверка.рф</a></PanelHeader>
		{oldHistoryArrRevers && oldHistoryArrRevers.length > 0 ? <Group>
			{oldHistoryArrRevers.map((auto, index) => <Cell
				before={<Avatar size={60} src={getPhoto(oldHistoryArrRevers[index])} className='auto-ico'/>}
				expandable
				className='pointer'
				key={index}
				onClick={() => {
					if ('is_ready' in auto && auto.is_ready === 1) {
						setIdHistory(index)
						setActiveStory('FullHistory')
						setIsOldHistory(true)
					} else {
						setPopout(<Alert
							actions={[{
								title: 'Хорошо',
								autoclose: false,
								action: () => setPopout( null )
							}]}
							onClose={() => setPopout( null )}
						>
							<h2>Полный отчёт еще не сформирован, попробуйте позже.</h2>
						</Alert>)
					}
				}}
			>
				<span className="text-bold">
					{getGibddHistoryDataArr(auto.preview,"model") && auto.preview.model}{!getGibddHistoryDataArr(auto.preview,"model") && auto.history && getGibddHistoryDataArr(auto.history.gibdd_base.vehicle,"model") && auto.history.gibdd_base.vehicle.model}{getYear(auto)}{auto.date && auto.date.length > 0 && ' (' + auto.date + ")"}</span> <br/>
					{'is_ready' in auto && auto.is_ready === 1  && getGibddHistoryDataArr(auto, "num") && <span>{"Госномер: " + auto.num}{getGibddHistoryDataArr(auto, "VIN") && ", "}</span>}{'is_ready' in auto && auto.is_ready === 1  && getGibddHistoryDataArr(auto, "VIN") && <span>{`${auto.VIN.length === 17? "VIN: " : "Кузов: "}` + auto.VIN}</span>}
					{'is_ready' in auto && auto.is_ready !== 1 && <span>{"Госномер: " + auto.preview.plate}{auto.preview.body_number && auto.preview.body_number.length > 0 && ", "}</span>}{'is_ready' in auto && auto.is_ready !== 1 && auto.preview.body_number && auto.preview.body_number.length > 0 && <span>{`${auto.preview.body_number && auto.preview.body_number.length === 17? "VIN: " : "Кузов: "}` + auto.preview.body_number && auto.preview.body_number.length > 0 && auto.preview.body_number}</span>}
					{/*{getGibddHistoryDataArr(auto, "num") && <span>{"Госномер: " + auto.num}{getGibddHistoryDataArr(auto, "VIN") && ", "}</span>}{getGibddHistoryDataArr(auto, "VIN") && <span>{`${auto.VIN.length === 17? "VIN: " : "Кузов: "}` + auto.VIN}</span>}*/}
			</Cell> ) }<List>
			</List>
		</Group> : <Group className='fix-menu-group textCenter'><Div><p>{!popout && "Вы еще не делали проверок"}</p></Div></Group>}
	</Panel>
}

export default MyChecks;
