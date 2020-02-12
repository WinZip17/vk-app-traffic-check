import React from 'react';
import FixedLayout from "@vkontakte/vkui/dist/components/FixedLayout/FixedLayout";
import Tabs from '@vkontakte/vkui/dist/components/Tabs/Tabs';
import HorizontalScroll from '@vkontakte/vkui/dist/components/HorizontalScroll/HorizontalScroll';
import TabsItem from '@vkontakte/vkui/dist/components/TabsItem/TabsItem';
import logo from "./img/logo.png"
import Icon28Menu from '@vkontakte/icons/dist/28/menu';
import ActionSheet from "@vkontakte/vkui/dist/components/ActionSheet/ActionSheet";
import ActionSheetItem from "@vkontakte/vkui/dist/es6/components/ActionSheetItem/ActionSheetItem";
import {platform, IOS} from '@vkontakte/vkui';
import {get_name_browser} from "./App";

const osName = platform();

export const Menu = (props) => {
    const {activePanel, setActivePanel, isMobPlatform, setPopout, getPreviewReport} = props

    const openMobMenu = () => {
        setPopout(
            <ActionSheet onClose={() => setPopout( null )}>
                <ActionSheetItem className='pointer' autoclose onClick={() => setActivePanel('competitors')} >
                    Чем мы лучше конкурентов
                </ActionSheetItem>
                <ActionSheetItem className='pointer' autoclose onClick={() => setActivePanel('comparison')}>
                    Сравнение цен
                </ActionSheetItem>
                <ActionSheetItem className='pointer' autoclose onClick={() => getPreviewReport()}>
                    Пример отчёта
                </ActionSheetItem>
                <ActionSheetItem className='pointer' autoclose onClick={() => setActivePanel('my-checks')}>
                    Мои проверки
                </ActionSheetItem>
                {osName === IOS && <ActionSheetItem className='pointer' autoclose theme="cancel">Закрыть</ActionSheetItem>}
            </ActionSheet>
        )
    }

    return <FixedLayout vertical="top">
        {isMobPlatform ? <Tabs theme="header" type="buttons" className='fixed-layout'>
            <img className='logo' src={logo} alt='logo' onClick={() => setActivePanel('home')} />
            <Icon28Menu className='gamburger pointer' onClick={openMobMenu} />
        </Tabs> : <Tabs theme="header" type="buttons">
            <HorizontalScroll className={!get_name_browser() ? '' : 'fix-horizontal-scroll-mozilla'}>
                <TabsItem
                    onClick={() => setActivePanel('home')}
                    selected={activePanel === 'home'}
                    className='pointer'
                >
                    <img className='logo' src={logo} alt='logo'/>
                </TabsItem>
                <TabsItem
                    onClick={() => setActivePanel('competitors')}
                    selected={activePanel === 'competitors'}
                    className='pointer'
                >
                    Чем мы лучше конкурентов
                </TabsItem>
                <TabsItem
                    onClick={() => setActivePanel('comparison')}
                    selected={activePanel === 'comparison'}
                    className='pointer'
                >
                    Сравнение цен
                </TabsItem>
                <TabsItem
                    onClick={() => getPreviewReport()}
                    selected={activePanel === 'FullHistory'}
                    className='pointer'
                >
                    Пример отчёта
                </TabsItem>
                <TabsItem
                    onClick={() => setActivePanel('my-checks')}
                    selected={activePanel === 'my-checks'}
                    className='pointer'
                >
                    Мои проверки
                </TabsItem>
            </HorizontalScroll>
        </Tabs>

        }

    </FixedLayout>
}
