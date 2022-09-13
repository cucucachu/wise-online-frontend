import * as React from 'react';
import { Card} from '../Card';
import { i18n } from 'web-translate';
import {InputRow} from '../InputRow';
import {InClassFlagAction} from '../../../types';
import {BubbleButtonRow} from '../BubbleButtonRow';
import './InClassOptions.css';

type InClassOptionsProps = {
  trackingDelay: number;
  setTrackingDelay(value: number): void;

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
        <h4>{i18n('InClass Session Setup Options')}</h4>
        <h5>{i18n('Begin tracking attendance after:')}</h5>
        <BubbleButtonRow>
          <BubbleButtonRow.Button onClick={() => props.setTrackingDelay(5)} selected={props.trackingDelay === 5}>
            5m
          </BubbleButtonRow.Button>
          <BubbleButtonRow.Button onClick={() => props.setTrackingDelay(10)} selected={props.trackingDelay === 10}>
            10m
          </BubbleButtonRow.Button>
          <BubbleButtonRow.Button onClick={() => props.setTrackingDelay(15)} selected={props.trackingDelay === 15}>
            15m
          </BubbleButtonRow.Button>
        </BubbleButtonRow>
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
