import React from 'react';
import styles from './ResultBox.module.scss';

const ResultBox = (props) => {
    const { question, isCorrect } = props;

    return (
        <div className={styles.resultWrapper} iscorrect={isCorrect?.toString()}>
            {question}
        </div>
    );
};

export default ResultBox;
