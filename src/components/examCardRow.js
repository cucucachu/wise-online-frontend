import React from 'react';

import ExamCard from './examCard';

function ExamCardRow (props) {
    return (
        <div className="row content-center">
            {
                (() => {
                    const examCards = [];
                    for (const exam of props.exams) {
                        
                        //props.courses be in course
                        const component = <ExamCard 
                            examId={exam.id} 
                            examDate={exam.date}
                            selectedCourse={props.selectedCourse}
                            handleSubmit={props.handleSubmitEditCourse}
                            key={exam._id}
                        />
                        examCards.push(component);
                    }
                    return examCards;
                })()
            }

        </div>
    );
}

export default ExamCardRow