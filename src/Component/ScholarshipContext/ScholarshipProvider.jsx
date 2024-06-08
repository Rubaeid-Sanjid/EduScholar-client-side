import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const scholarshipContext = createContext();

const ScholarshipProvider = ({children}) => {
    const [scholarshipId, setScholarshipId] = useState("");
    return (
        <scholarshipContext.Provider value={{ scholarshipId, setScholarshipId }}>
            {children}
        </scholarshipContext.Provider>
    );
};

ScholarshipProvider.propTypes = {
    children:PropTypes.node
};

export default ScholarshipProvider;