import { IndicatorDot } from '../../Resusable/IndicatorDot';
import {StudentCourseSessions} from '../types';

export const ActiveStatus: React.FC<{ studentSessions: StudentCourseSessions, device: string }> = ({ studentSessions, device }) => {
  const sessionsForDevice = studentSessions?.byDevice[device] ?? [];

  if (sessionsForDevice?.length) {
      if (sessionsForDevice[sessionsForDevice.length - 1].disconnectedTime) {
          return (
              <div>
                  <IndicatorDot color='red' />
                  Disconnected
              </div>
          );
      }

      return (
          <div>
              <IndicatorDot color='green' />
              Online
          </div>
      )
  }

  return (
      <div>
          <IndicatorDot color='gray' />
          Not entered
      </div>
  )
}
