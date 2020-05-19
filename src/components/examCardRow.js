import React from 'react';

import ExamCard from './examCard';
import { submitTabs } from '../store/axios';

function ExamCardRow (props) {
    return (
        <div className="row content-center">
            {
                (() => {
                    const examCards = [];
                    // for (const exam of props.exams) {
                        
                    //     const component = <ExamCard 
                    //         examId={exam.id} 
                    //         examDate={exam.date}
                    //         selectedCourse={props.selectedCourse}
                    //         handleSubmit={props.handleSubmitEditCourse}
                    //         key={exam._id}
                    //     />
                    //     examCards.push(component);
                    // }
                    for (const exam of props.examData) {
                        // console.log('examdata.results: ', exam);
                        const isRedFlag = exam.results.filter(lower => lower.confidenceScore < 0.4)
                        // console.log('isRedFlag: ', isRedFlag);
                        const isRedTab = exam.results.filter(result => result.tabs.red.length
                            > 0)
                        console.log('red: ', isRedTab.length);
                        
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