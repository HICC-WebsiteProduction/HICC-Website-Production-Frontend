import React, { useState } from 'react';
import styled from 'styled-components';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsWrapper>
      <TabList>
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            onClick={() => setActiveTab(index)}
            active={activeTab === index}
          >
            {tab.title}
          </TabItem>
        ))}
      </TabList>
      <TabContent>{tabs[activeTab].content}</TabContent>
    </TabsWrapper>
  );
};

export default Tabs;

const TabsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TabItem = styled.li`
  margin-right: 20px;
  cursor: pointer;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
`;

const TabContent = styled.div`
  width: 100%;
  display: flex;
`;
