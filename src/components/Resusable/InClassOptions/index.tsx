import { Card} from '../Card';
import { i18n } from 'web-translate';
import {InputRow} from '../InputRow';

type InClassOptionsProps = {
  trackingDelay: string;
  setTrackingDelay(value: string): void;

  attendanceThreshold: string;
  setAttendanceThreshold(value: string): void;

  flagTriggers: string[];
  setFlagTriggers(triggers: string[]): void;
}

export const InClassOptions: React.FC<InClassOptionsProps> = (props) => {
  return (
    <Card>
      <h4>{i18n('InClass Session Setup Options')}</h4>
      <p>
        {i18n('We recommend the default settings below, of 5m and 99% threshold, to prevent false-positive flags from students logging in or out of class')}
      </p>
      <InputRow
        label={i18n('Begin tracking attendance after:')}
        value={props.trackingDelay}
        onChange={props.setTrackingDelay}
      />
      <InputRow
        label={i18n('Threshold of Engagement for Attendance')}
        value={props.attendanceThreshold}
        onChange={props.setAttendanceThreshold}
      />
      
    </Card> 
  )
}
