import React, {useState} from 'react';
//import Pagination from '@material-ui/lab/Pagination';
import Tags from './Tags/Tags';
import Search from './Search';
import Pagination from './Pagination';
import BusinessCard from './BusinessCard';
import VolunteerCard from './VolunteerCard';
import classes from '../modules/list.module.css';

const List = ({ businesses }) => {
    const SearchBar = () => (
        <div className={classes.searchBar}>
            <Search />
            <Tags />
        </div>
    );
    const [currentPage, setPage] = useState(1);
    const handleChange = (event, currentPage) => {
        setPage(currentPage);
    }

    return (
        <div className={classes.root}>
            <SearchBar />
            
            <Pagination page={currentPage} handleChange={handleChange}/>

            <div className={classes.container}>
                {businesses && businesses
                    .slice((currentPage - 1) * 6, currentPage * 6)
                    .map(({ id, ...props }) => (
                    <BusinessCard key={id} {...props} />
                ))}
            </div>
        </div>
    );
};

export default List;
