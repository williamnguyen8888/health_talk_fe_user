// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getUser, deleteUser } from '../store'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// ** Renders Client Columns
// const renderClient = row => {
//   if (row.avatar.length) {
//     return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
//   } else {
//     return (
//       <Avatar
//         initials
//         className='me-1'
//         color={row.avatarColor || 'light-primary'}
//         content={row.fullName || 'John Doe'}
//       />
//     )
//   }
// }

// ** Renders Role Columns
// const renderRole = row => {
//   const roleObj = {
//     subscriber: {
//       class: 'text-primary',
//       icon: User
//     },
//     maintainer: {
//       class: 'text-success',
//       icon: Database
//     },
//     editor: {
//       class: 'text-info',
//       icon: Edit2
//     },
//     author: {
//       class: 'text-warning',
//       icon: Settings
//     },
//     admin: {
//       class: 'text-danger',
//       icon: Slack
//     }
//   }
//
//   const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2
//
//   return (
//     <span className='text-truncate text-capitalize align-middle'>
//       <Icon size={18} className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`} />
//       {row.role}
//     </span>
//   )
// }

const statusObj = {
  active: 'light-warning',
  block: 'light-success',
  pending: 'light-secondary'
}
const statusTextObj = {
  active: 'Pending',
  block: 'Active',
  pending: 'Block'
}

export const columns = [
  {
    name: 'userName',
    sortable: true,
    minWidth: '300px',
    sortField: 'userName',
    selector: row => row.userName,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {/*{renderClient(row)}*/}
        <div className='d-flex flex-column'>
          <Link
            to={`/apps/user/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className='fw-bolder'>{row.userName}</span>
          </Link>
          <small className='text-truncate text-muted mb-0'>{row.email}</small>
        </div>
      </div>
    )
  },
  {
    name: 'Gender',
    sortable: true,
    minWidth: '172px',
    sortField: 'gender',
    selector: row => row.gender,
    cell: row => <span className='text-capitalize'>{row.gender}</span>
  },
  {
    name: 'Role',
    minWidth: '138px',
    sortable: true,
    sortField: 'role',
    selector: row => row.roles.roleName,
    cell: row => <span className='text-capitalize'>{row.roles.roleName}</span>
  },
  {
    name: 'Full Name',
    minWidth: '230px',
    sortable: true,
    sortField: 'fullName',
    selector: row => row.fullName,
    cell: row => <span className='text-capitalize'>{row.fullName}</span>
  },
  {
    name: 'Created By',
    minWidth: '138px',
    sortable: true,
    sortField: 'isActive',
    selector: row => row.isActive,
    cell: row => (
        <Badge className='text-capitalize' color={statusObj[row.activeStatus.name]} pill>
          {
            statusTextObj[row.activeStatus.name]
          }
        </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
        <div className='column-action'>
          <UncontrolledDropdown>
            <DropdownToggle tag='div' className='btn btn-sm'>
              <MoreVertical size={14} className='cursor-pointer' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                  tag={Link}
                  className='w-100'
                  to={`/apps/user/view/${row.id}`}
                  onClick={() => store.dispatch(getUser(row.id))}
              >
                <FileText size={14} className='me-50' />
                <span className='align-middle'>Details</span>
              </DropdownItem>
              <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                <Archive size={14} className='me-50' />
                <span className='align-middle'>Edit</span>
              </DropdownItem>
              <DropdownItem
                  tag='a'
                  href='/'
                  className='w-100'
                  onClick={e => {
                    e.preventDefault()
                    store.dispatch(deleteUser(row.id))
                  }}
              >
                <Trash2 size={14} className='me-50' />
                <span className='align-middle'>Delete</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
    )
  }
]
