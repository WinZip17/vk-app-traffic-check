import React, {Fragment, useEffect, useState, useRef} from 'react';
import {platform, IOS, Group} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Div from "@vkontakte/vkui/dist/es6/components/Div/Div";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import {modifyUrl} from "../util";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import validator from 'email-validator'
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import bridge from "@vkontakte/vk-bridge";

const osName = platform();

const PreviewHistiry = (props) => {
	const {id, go, previewData,  getGibddHistory, price, number, myParam, fetchedUser, setEmailValue, emailValue, setActiveModal, setHeight } = props
	const Hashtag = <Fragment><span className="bl_color">#</span></Fragment>
	const [isIOS, setIsIOS] = useState(false);
	const img = useRef(null);
	const [valid, setValid] = useState(true);
	const [isBlocked, setIsBlocked] = useState(false);


	useEffect(() => {
		const setHightFunc = () => {
			if (previewData.image && previewData.image.length > 0 && img && img.current.height > 0) {
				setHeight(850 + img.current.height)
			}
		}
		setTimeout(setHightFunc, 200);
	}, [previewData, img]);


	useEffect(() => {
		if (myParam === "mobile_iphone" || myParam === "mobile_iphone_messenger" ) {
			setIsIOS(true)
		}
	}, [myParam]);

	const getNamePreviewDataArr = (name) => {
		let arr = []
		if (previewData) {
			for (let key in previewData) (
				arr.push(key)
			)

		}
		return arr.includes(name) && previewData[name].length > 0
	}

	const onChangeEmail = (e) => {
		setIsBlocked(false)
		setValid(validator.validate(e.target.value))
		setEmailValue(e.target.value)
	}

	const getEmail = () => {
		bridge
			.send('VKWebAppGetEmail')
			.then(data => {
				// Handling received data
				setEmailValue(data.email)
				// bridge.send("VKWebAppOpenPayForm", {"app_id": +app_id, "action": "pay-to-group", "params": {"amount" : price, "description" : `Оплата проверки истории авто. ${number > 11 ? "VIN" + number : "Госномер:" + number}`, 'group_id' : group_id }})
			})
			.catch(error => {
				// Handling an error
			});
	}

	return <Panel id={id}>
		<PanelHeader
			left={<PanelHeaderButton onClick={go} data-to="home">
				{osName === IOS ? <Icon28ChevronBack className="pointer" /> : <Icon24Back className="pointer" />}
			</PanelHeaderButton>}
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
					</p>
					{getNamePreviewDataArr("image") && <img  ref={img} src={modifyUrl(previewData.image)} alt='photo' className='photo'/>}
				</Div>
				<Div className='textCenter'>
					<h3>В полном отчёте за <span className='arial'>{price} ₽</span> доступно:</h3>
					<p>
						{Hashtag}пробег {Hashtag}регистрации {Hashtag}ДТП {Hashtag}ограничения {Hashtag}розыск {Hashtag}данные о залогах {Hashtag}диагностическая карта {Hashtag}ОСАГО {Hashtag}штрафы {Hashtag}фотографии {Hashtag}объявления о продаже {Hashtag}профили на drive2.ru {Hashtag}проверка на работу в такси {Hashtag}характеристики авто
					</p>
				</Div>
				<Div className='textCenter'>
					<p>
						Формирование отчёта занимает от 1 до 5 минут.
					</p>
					<p>
						Заказанный отчёт придет на указанную почту.
					</p>
				</Div>

			 <Div>
					<FormLayout>
						<Input
							type="email"
							top="E-mail"
							name="email"
							value={emailValue}
							onChange={onChangeEmail}
							status={valid ? 'valid' : 'error'}
							bottom={valid ? '' : 'Введен некорректный почтовый адрес'}
						/>
					</FormLayout>
					<Button mode="tertiary" className='pointer' onClick={getEmail} >Скопировать E-mail из профиля</Button>
				</Div>

				<Div>
					{/*{isIOS ? <a target="_blank" className='text-decoration-none' href={`https://xn----8sbbfchakv0a5blnd.xn--p1ai/?vin_or_num=${number}&user_id=${fetchedUser.id}&miniapp=true`}><Button name="top" size="xl" >*/}
					{/*	Купить полный отчёт*/}
					{/*</Button></a>: <Button name="top" size="xl" onClick={getGibddHistory} >*/}
					{/*	Купить полный отчёт*/}
					{/*</Button>}*/}
					{/*{isIOS ? <Button name="top" size="xl" disabled={!valid || emailValue.length === 0} onClick={getGibddHistory} >*/}
					{/*	Купить полный отчёт*/}
					{/*</Button> :*/}
					{/*<Button name="top" size="xl" onClick={getGibddHistory} >*/}
					{/*	Купить полный отчёт*/}
					{/*</Button>}*/}
					<Button className='pointer' name="top" size="xl" disabled={!valid || emailValue.length === 0 || isBlocked} onClick={() => {
						setIsBlocked(true)
						getGibddHistory()
					}} >
						Купить полный отчёт
					</Button>
					<p>
						Пользуясь нашим сервисом, вы автоматически принимаете условия <a className='natural-link' onClick={() => setActiveModal('hard-text')}>договора оферты</a>
					</p>
				</Div>
		</Group>
	</Panel>
}


export default PreviewHistiry;
