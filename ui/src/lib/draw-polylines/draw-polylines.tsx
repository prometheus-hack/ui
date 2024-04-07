import { useEffect, useState } from 'react';
import { Polyline } from '@pbe/react-yandex-maps';

/* eslint-disable-next-line */
type Point = [number, number];
type Line = {
  points: Point[]
  color: string
}

const COLORS: { [key: string]: string } = {
  'fast': '#41d700',
  'normal': '#dcb900',
  'slow': '#d30000'
} as const;

const convertLineStringToPoints = (lineString: string): Point[] => {
  const str = lineString.replace('LINESTRING(', '').replace(')', '');
  return str.split(', ').map((pair) => {
    const coords = pair.split(' ').map(Number);
    return [coords[1], coords[0]];
  });
};

export function DrawPolylines({ points }: { points: [Point, Point] }) {
  const [lines, setLines] = useState<Line[]>([]);
  useEffect(() => {
    (async () => {
      await fetch('https://hack2.k-lab.su/generatePath', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'points': [
            {
              'y': points[0][0],
              'x': points[0][1]
            },
            {
              'y': points[1][0],
              'x': points[1][1]
            }
          ]
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const paths = data[0].path;
            const lines = new Array<Line>();
            paths.forEach((path: { color: string, selection: string }) => {
              lines.push({
                color: path.color,
                points: convertLineStringToPoints(path.selection)
              });
            });
            setLines(lines);
          }
        })
        .catch(error => {
          console.error(error);
        });
    })();
  }, [points]);
  return <>
    {lines.map((line, index) => <Polyline
      key={index}
      geometry={line.points}
      options={{
        strokeColor: COLORS[line.color] ?? '#000',
        strokeWidth: 4,
        strokeOpacity: 0.8
      }}
    />)}
  </>;
}

export default DrawPolylines;
