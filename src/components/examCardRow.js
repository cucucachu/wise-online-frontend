import React from 'react';

import ExamCard from './examCard';

function ExamCardRow (props) {
    return (
        <div className="row content-center">
            {
                (() => {
                    const examCards = [];
                    for (const exam of props.examData) {
                        const isRedFlag = exam.results.filter(lower => lower.confidenceScore <= 0.4 && lower.confidenceScore !== 0)
                        const isRedTab = exam.results.filter(result => result.tabs.red.length
                            > 0)                        
                        const component = <ExamCard 
                            examId={exam.id} 
                            examDate={exam.date}
                            isRedFlag={isRedFlag}
                            exam={exam}
                            isRedTab={isRedTab.length}
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