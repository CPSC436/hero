import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Pagination, PaginationItem } from '@material-ui/lab'
import Tags from './Tags/Tags'
import Search from './Search'
import BusinessCard from './BusinessCard'
import { clearKeyword as clear } from '../actions'
import classes from '../modules/list.module.css'

const BusinessesList = ({ businesses, keyword, clear }) => {
    const [currentPage, setPage] = useState(1)
    const handleChange = (_, currentPage) => {
        setPage(currentPage)
    }
    useEffect(() => {
        clear()
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.searchBar}>
                <Search />
                <Tags />
            </div>
            <div className={classes.page}>
                <Pagination
                    onChange={handleChange}
                    page={currentPage}
                    count={Math.ceil(businesses.length / 6)}
                    renderItem={item => (
                        <PaginationItem {...item} />
                    )}
                />
            </div>
            <div className={classes.container}>
                {businesses && businesses
                    .filter(({ storeName }) => storeName.includes(keyword))
                    .slice((currentPage - 1) * 6, currentPage * 6)
                    .map(({ id, ...props }) => (
                        <BusinessCard key={id} id={id} {...props} />
                    ))}
            </div>
        </div>
    )
}

const mapStateToProps = ({ businesses, keyword }) => ({ businesses, keyword })

export default connect(mapStateToProps, { clear })(BusinessesList)
