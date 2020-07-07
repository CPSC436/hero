import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination, PaginationItem } from '@material-ui/lab'
import Tags from '../Tags/Tags'
import Search from '../Search'
import VolunteerCard from './components/VolunteerCard'
import { LoadingIndicator } from '../Form/components'
import { setKeyword, setFilters, getUsers } from '../../actions'
import { defaultSkills } from '../../constant'
import classes from '../../modules/list.module.css'

const VolunteersList = ({
    users, volunteers, filters, keyword, setKeyword, setFilters, getUsers,
}) => {
    const [currentPage, setPage] = useState(1)
    const handleChange = (_, currentPage) => {
        setPage(currentPage)
    }
    useEffect(() => {
        async function loadUsers() {
            await getUsers()
        }
        loadUsers()
        setKeyword('')
        setFilters([])
    }, [])

    return (
        <>
            {users.loading
                ? <LoadingIndicator />
                : <div className={classes.root}>
                    <div className={classes.searchBar}>
                        <Search />
                        <Tags tags={defaultSkills} canSelect />
                    </div>
                    <div className={classes.page}>
                        <Pagination
                            onChange={handleChange}
                            page={currentPage}
                            count={Math.ceil(volunteers.length / 6)}
                            renderItem={item => <PaginationItem {...item} />}
                        />
                    </div>
                    <div className={classes.container}>
                        {volunteers
                            .filter(({ description }) => description.includes(keyword))
                            .filter(({ tags }) => !filters.length
                                || filters.every(tag => tags.some(({ label }) => label === tag)))
                            .slice((currentPage - 1) * 6, currentPage * 6)
                            .map(({ id, ...props }) => <VolunteerCard key={id} {...props} />)}
                    </div>
                </div>
            }
        </>
    )
}

const mapStateToProps = ({ users, filters, keyword }) => ({ users, volunteers: users.data.filter(({ available }) => available), filters, keyword })
const mapDispatchToProps = { setKeyword, setFilters, getUsers }

export default connect(mapStateToProps, mapDispatchToProps)(VolunteersList)
