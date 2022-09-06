import * as React from 'react';
import { Card} from '../Card';
import { i18n } from 'web-translate';
import {InputRow} from '../InputRow';
import {InClassFlagAction} from '../../../types';
import './InClassOptions.css';

type InClassOptionsProps = {
  trackingDelay: string;
  setTrackingDelay(value: string): void;

  attendanceThreshold: string;
  setAttendanceThreshold(value: string): void;

  flagTriggers: InClassFlagAction[];
  setFlagTriggers(triggers: InClassFlagAction[]): void;
}

const FlagRow: React.FC<{ id: InClassFlagAction, name: string, checked: boolean, onToggle(id: InClassFlagAction, checked: boolean): void }> = (props) => {
  return (
    <div>
      <label className='in-class-flag-row' htmlFor={props.id}>
        <input onChange={(e) => props.onToggle(props.id, e.target.checked)} checked={props.checked} type='checkbox' value={props.id} id={props.id} />
        {props.name}
      </label>
    </div>
  );
}

export const InClassOptions: React.FC<InClassOptionsProps> = (props) => {
  const { flagTriggers, setFlagTriggers } = props;
  const onToggleFlag = React.useCallback((flag: InClassFlagAction, checked: boolean) => {
    const newFlagTriggers = new Set(flagTriggers);
    if (checked) {
      newFlagTriggers.add(flag);
    } else {
      newFlagTriggers.delete(flag);
    }

    setFlagTriggers([...newFlagTriggers]);
  }, [flagTriggers, setFlagTriggers]);

  return (
    <Card>
      <Card.Body className='in-class-options-card'>
        <h5>{i18n('InClass Session Setup Options')}</h5>
        <p>
          {i18n('We recommend the default settings below, of 5m and 99% threshold, to prevent false-positive flags from students logging in or out of class')}
        </p>
        <InputRow
          label={i18n('Begin tracking attendance after:')}
          value={props.trackingDelay}
          onChange={props.setTrackingDelay}
          placeholder=''
          unitLabel='m'
        />
        <InputRow
          label={i18n('Threshold of Engagement for Attendance')}
          value={props.attendanceThreshold}
          onChange={props.setAttendanceThreshold}
          placeholder=''
          unitLabel='%'
        />
        <h5>{i18n('Flag If')}</h5>
        <FlagRow
          id={InClassFlagAction.phoneDisconnected}
          name='Phone Disconnected'
          onToggle={onToggleFlag}
          checked={flagTriggers.includes(InClassFlagAction.phoneDisconnected)}
        />
        <FlagRow
          id={InClassFlagAction.nonAllowedUrl}
          name='Non-Allowed URL/App Visited'
          onToggle={onToggleFlag}
          checked={flagTriggers.includes(InClassFlagAction.nonAllowedUrl)}
        />
        <FlagRow
          id={InClassFlagAction.computerDisconnected}
          name='Computer Disconnected'
          onToggle={onToggleFlag}
          checked={flagTriggers.includes(InClassFlagAction.computerDisconnected)}
        />
      </Card.Body>
    </Card> 
  )
}
