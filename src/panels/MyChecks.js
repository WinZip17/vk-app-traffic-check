import React, {useEffect} from 'react';
import { Group, List} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import {Menu} from "../Menu";
import Avatar from "@vkontakte/vkui/dist/es6/components/Avatar/Avatar";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import no_image from "../img/no_image.png"
import {getGibddHistoryDataArr, modifyUrl} from "../util";
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import {get_name_browser} from "../App";

const MyChecks = (props) => {
	const {id, activePanel, setActivePanel, setPreviousPanel, isMobPlatform,
		getOldHistory, setHeight, oldHistoryArr, popout, setIdHistory, setPopout, getPreviewReport} = props

	useEffect(() => {
		setPreviousPanel(id)
		setHeight(900)
		getOldHistory()
	}, []);

	return <Panel id={id}>
		<PanelHeader noShadow={true}><a target="_BLANK" className='panel-header-link' href="https://xn----8sbbfchakv0a5blnd.xn--p1ai/">ГИБДД-проверка.рф</a></PanelHeader>
		<Menu getPreviewReport={getPreviewReport} activePanel={activePanel} setActivePanel={setActivePanel} isMobPlatform={isMobPlatform} setPopout={setPopout}/>
		{oldHistoryArr && oldHistoryArr.length > 0 ? <Group className={`${get_name_browser() ? "fix-menu-group-mozilla" : "fix-menu-group" }`}>
			{oldHistoryArr.map((auto, index) => <Cell
				before={<Avatar size={60} src={auto.imgs && getGibddHistoryDataArr(auto.imgs, "status") && auto.imgs.status === 200 && auto.imgs.photo.length > 0 ? modifyUrl(auto.imgs.photo[0].src) : no_image} className='auto-ico'/>}
				expandable
				className='pointer'
				key={index}
				onClick={() => {
					setIdHistory(index)
					setActivePanel('OldHistory')
				}}
			>
				<span className="text-bold"> {getGibddHistoryDataArr(auto.history,"gibdd_base") && getGibddHistoryDataArr(auto.history.gibdd_base.vehicle,"model") && auto.history.gibdd_base.vehicle.model}
				{getGibddHistoryDataArr(auto.history,"gibdd_base") && getGibddHistoryDataArr(auto.history.gibdd_base.vehicle,"year") && ", " + auto.history.gibdd_base.vehicle.year}</span> <br/>
				{getGibddHistoryDataArr(auto, "num") && <span>{"Госномер: " + auto.num}{getGibddHistoryDataArr(auto, "VIN") && ", "}</span>}{getGibddHistoryDataArr(auto, "VIN") && <span>{"VIN: " + auto.VIN}</span>}
			</Cell> ) }<List>
			</List>
		</Group> : <Group className='fix-menu-group textCenter'><Div><p>{!popout && "Вы еще не делали проверок"}</p></Div></Group>}
	</Panel>
}

export default MyChecks;
