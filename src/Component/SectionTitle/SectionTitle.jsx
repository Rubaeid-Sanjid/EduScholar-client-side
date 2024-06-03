import PropTypes from 'prop-types';

const SectionTitle = ({title, subtitle}) => {
    return (
        <div className='text-center lg:w-2/5 my-12 mx-auto border-y-2'>
            <h2 className='text-3xl lg:text-4xl my-5'>{title}</h2>
            <h2 className='mb-5'>{subtitle}</h2>
        </div>
    );
};

export default SectionTitle;

SectionTitle.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string
};
