import React from 'react';
import { Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Div from "@vkontakte/vkui/dist/components/Div/Div";


const Info = (props) => {
	const { id, text } = props

	const createMarkup = (text) => {
		return {__html: text}
	}

	return <Panel id={id}>
		<PanelHeader>
			Информация
		</PanelHeader>
		<Group>
			<Div>
				<div dangerouslySetInnerHTML={createMarkup(text)}/>
			</Div>
		</Group>
	</Panel>
}


export default Info;
