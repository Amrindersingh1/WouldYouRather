import { Tab } from 'semantic-ui-react';
import UserCard from './UserCard';
import React, { Component } from 'react';

export const Panes = props => {
    const { questionData,users } = props;
    return [
      {
        menuItem: 'UnAnswered',
        render: () => (
          <Tab.Pane>
            {questionData.answered.map(question => (
              <UserCard
                key={question.id}
                question={question}
                unanswered={true}
                users={users}
              />
            ))}
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Answered',
        render: () => (
          <Tab.Pane>
            {questionData.unanswered.map(question => (
              <UserCard
                key={question.id}
                question={question}
                unanswered={false}
                users={users}
              />
            ))}
          </Tab.Pane>
        )
      }
    ];
  };
  
 