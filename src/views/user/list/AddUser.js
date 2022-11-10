// ** React Imports
import {Fragment, useEffect, useState} from 'react'

// ** Reactstrap Imports
import {
    Card,
    Row,
    Col,
    Modal,
    Input,
    Label,
    Button,
    CardBody,
    CardText,
    CardTitle,
    ModalBody,
    ModalHeader,
    FormFeedback,
    Form
} from 'reactstrap'

// ** Third Party Components
import Select from 'react-select'
import {User, Check, X} from 'react-feather'
import {useForm, Controller} from 'react-hook-form'
import moment from 'moment'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// ** Utils
import {selectThemeColors} from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'

//** i18n
import {useTranslation} from "react-i18next"
import PickerDateTime from "./PickerDateTime"
import Flatpickr from "react-flatpickr"

import axios from "axios"
// ** Custom Components
import UILoader from '@components/ui-loader'
import Spinner from '@components/spinner/Loading-spinner'

const statusOptions = [
    {value: 'active', label: 'Active'},
    {value: 'inactive', label: 'Inactive'},
    {value: 'suspended', label: 'Suspended'}
]

const EditUserExample = () => {
    //sweet alert

    const MySwal = withReactContent(Swal)

    const handleSuccess = () => {
        return MySwal.fire({
            title: 'Good job!',
            text: 'You clicked the button!',
            icon: 'success',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
    }

    const handleError = () => {
        return MySwal.fire({
            title: 'Error!',
            text: ' You clicked the button!',
            icon: 'error',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            buttonsStyling: false
        })
    }

    // ** States
    const [show, setShow] = useState(false)
    const {t} = useTranslation()
    const [picker, setPicker] = useState(moment()
        .locale('en')
        .format('YYYY-MM-DD'))
    const [block, setBlock] = useState(false)

    // ** Hooks
    const {
        control,
        setError,
        handleSubmit,
        // setValue,
        formState: {errors}
    } = useForm()

    useEffect(() => {
        return () => setBlock(false)
    }, [])

    const checkIsValid = data => {
        return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
    }

    const onSubmit = async data => {
        setBlock(true)
        console.log(data)
        data.fullName = data.firstName + data.lastName
        data.birthDay = picker

        if (checkIsValid(data)) {
            await axios.put('/api/user-auth', data)
                .then(() => {
                    setBlock(false)
                    setShow(false)
                    handleSuccess()
                })
                .catch((err) => {
                    handleError()
                    setBlock(false)
                    console.log(err)
                })
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    return (
        <Fragment>

            <Button color='primary' onClick={() => setShow(true)}>
                {t('Add New User')}
            </Button>

            <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                <UILoader blocking={block} loader={<Spinner/>}>
                    <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                    <ModalBody className='px-sm-5 mx-50 pb-5'>
                        <div className='text-center mb-2'>
                            <h1 className='mb-1'>{t('Add New User')}</h1>
                            <p>Updating user details will receive a privacy audit.</p>
                        </div>
                        <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
                            <Col md={12} xs={12}>
                                <Label className='form-label' for='username'>
                                    {t('Username')}
                                </Label>
                                <Controller
                                    name='userName'
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} id='userName' invalid={errors.userName && true}/>
                                    )}
                                />
                                {errors.userName && <FormFeedback>Please enter a valid Username</FormFeedback>}
                            </Col>

                            <Col md={6} xs={12}>
                                <Label className='form-label' for='firstName'>
                                    {t('First Name')}
                                </Label>
                                <Controller
                                    control={control}
                                    name='firstName'
                                    render={({field}) => {
                                        return (
                                            <Input
                                                {...field}
                                                id='firstName'
                                                placeholder='John'
                                                invalid={errors.firstName && true}
                                            />
                                        )
                                    }}
                                />
                                {errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>

                            <Col md={6} xs={12}>
                                <Label className='form-label' for='lastName'>
                                    {t('Last Name')}
                                </Label>
                                <Controller
                                    name='lastName'
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} id='lastName' placeholder='Doe'
                                               invalid={errors.lastName && true}/>
                                    )}
                                />
                                {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                            </Col>

                            <Col md={12} xs={12}>
                                <Label className='form-label' for='address'>
                                    {t('Address')}
                                </Label>
                                <Controller
                                    name='address'
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} id='address' invalid={errors.address && true}/>
                                    )}
                                />
                                {errors.address && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                            </Col>

                            <Col md={6} xs={12}>
                                <Label className='form-label' for='gender'>
                                    {t('Gender')}
                                </Label>
                                <Controller
                                    name='gender'
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} id='gender' invalid={errors.gender && true}/>
                                    )}
                                />
                                {errors.gender && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                            </Col>

                            <Col md={6} xs={12}>
                                <Label className='form-label' for='birthDay'>
                                    {t('Dob')}
                                </Label>
                                <Controller
                                    name='birthDay'
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} id='birthDay' type="Date"
                                               onChange={data => setPicker(data.target.value)} value={picker}
                                               invalid={errors.birthDay && true}/>
                                    )}
                                />
                                {errors.birthDay && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className='form-label' for='email'>
                                    {t('Email')}
                                </Label>
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} id='email' type='email' invalid={errors.email && true}/>
                                    )}
                                />
                                {errors.email && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                            </Col>
                            <Col md={6} xs={12}>
                                <Label className='form-label' for='status'>
                                    {t('Status')}
                                </Label>
                                <Controller
                                    name='status'
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            id='status'
                                            isClearable={false}
                                            className='react-select'
                                            classNamePrefix='select'
                                            options={statusOptions}
                                            theme={selectThemeColors}
                                            defaultValue={statusOptions[0]}
                                        />
                                    )}
                                />
                                {errors.contact && <FormFeedback>Please enter a valid Last Name</FormFeedback>}

                            </Col>

                            <Col md={6} xs={12}>
                                <Label className='form-label' for='contact'>
                                    Contact
                                </Label>
                                <Controller
                                    name='phoneNumber'
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} id='contact' invalid={errors.contact && true}/>
                                    )}
                                />
                                {errors.contact && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                            </Col>

                            <Col md={6} xs={12}>
                                <Label className='form-label' for='role'>
                                    {t('Role')}
                                </Label>
                                <Controller
                                    name='role'
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            id='role'
                                            isClearable={false}
                                            className='react-select'
                                            classNamePrefix='select'
                                            options={statusOptions}
                                            theme={selectThemeColors}
                                            defaultValue={statusOptions[0]}
                                        />
                                    )}
                                />
                                {errors.role && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                            </Col>

                            <Col xs={12} className='text-center mt-2 pt-50'>
                                <Button type='submit' className='me-1' color='primary'>
                                    Submit
                                </Button>
                                <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>
                                    Discard
                                </Button>
                            </Col>
                        </Row>

                    </ModalBody>
                </UILoader>
            </Modal>

        </Fragment>
    )
}

export default EditUserExample
