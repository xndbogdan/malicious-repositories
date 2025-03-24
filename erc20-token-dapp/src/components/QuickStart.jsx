import { Card, Timeline, Typography } from 'antd';
import React, { useMemo } from 'react';
import { useMoralis } from 'react-moralis';

const { Text } = Typography;

const styles = {
  title: {
    fontSize: '20px',
    fontWeight: '700',
  },
  text: {
    fontSize: '16px',
  },
  card: {
    boxShadow: '0 0.5rem 1.2rem rgb(189 197 209 / 20%)',
    border: '1px solid #e7eaf3',
    borderRadius: '0.5rem',
  },
  timeline: {
    marginBottom: '-45px',
  },
};

export default function QuickStart({ isServerInfo }) {
  const { Moralis } = useMoralis();

  const isInchDex = useMemo(
    () => (Moralis.Plugins?.oneInch ? true : false),
    [Moralis.Plugins?.oneInch]
  );

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Card
        style={styles.card}
        title={
          <>
            📝 <Text strong>To-Do List</Text>
          </>
        }
      >
        <Timeline mode="left" style={styles.timeline}>
          <Timeline.Item dot="📄">
            <Text delete style={styles.text}>
              Please Edit the HomePage{' '}
              <a href="https://www.elotoken.com" target="_blank" rel="noopener noreferrer">
                elotoken
              </a>{' '}
            </Text>
          </Timeline.Item>
        </Timeline>
      </Card>
    </div>
  );
}
