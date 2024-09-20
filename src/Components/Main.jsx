import { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import Card from "./Card";
import styled from "styled-components";

const StyledMain = styled.main`
    padding: 10px 30px; 
    display: flex;
    gap: 20px;
`

const Row = styled.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

function Main() {
    const { grouping, sorting, priorityWiseTickets, statusWiseTickets, userWiseTickets } = useData();
    const [groupedData, setGroupedData] = useState(priorityWiseTickets);

    const sortTickets = (tickets) => {
        return [...tickets].sort((a, b) => {
            if (sorting === "Priority") {
                return a.priority - b.priority;
            } else if (sorting === "Title") {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    useEffect(() => {
        const getGroupedData = () => {
            let grouped = {};

            if (grouping === "Priority") {
                grouped = priorityWiseTickets;
            } else if (grouping === "Status") {
                grouped = statusWiseTickets;
            } else if (grouping === "User") {
                grouped = userWiseTickets;
            }

            // Apply sorting to each group of tickets
            const sortedGroupedData = {};
            Object.keys(grouped).forEach((key) => {
                sortedGroupedData[key] = sortTickets(grouped[key]);
            });

            setGroupedData(sortedGroupedData);
        };

        getGroupedData();
    }, [grouping, sorting, priorityWiseTickets, statusWiseTickets, userWiseTickets]);

    return (
        <StyledMain>
            {Object.keys(groupedData).map((key) => (
                <div key={key} style={{ flex: 1 }}>

                    <Row>
                        <Row>
                            {grouping === "User" ?
                                <img
                                    src="https://png.pngtree.com/png-clipart/20230904/original/pngtree-profile-picture-vector-illustration-12-png-image_10845726.png"
                                    alt="img"
                                    height="30px"
                                />
                                :
                                <img src={`/img/${key.replace(" ", "-")}.svg`} alt="" />
                            }
                            <h4 style={{ padding: "0 10px" }}>{key}</h4>
                        </Row>
                        <Row>
                            <img src="/img/add.svg" alt="add" />
                            <img src="/img/3dotmenu.svg" alt="menu" />
                        </Row>
                    </Row>
                    {groupedData[key].map((ticket, index) => (
                        <Card key={index} ticket={ticket} priority={key} />
                    ))}
                </div>
            ))}
        </StyledMain>
    );
}

export default Main;
