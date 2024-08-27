import { useCallback, useEffect, useState } from 'react';
import Webcam from 'react-webcam';

export default function App() {
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  return (
    <>
      {devices.map((device, key) => (
        <div key={key}>
          <Webcam
            audio={false}
            videoConstraints={{ deviceId: device.deviceId, torch: true }}
          />
          <div>{JSON.stringify(device)}</div>
          <div>{device.label || `Device ${key + 1}`}</div>
        </div>
      ))}
    </>
  );
}
