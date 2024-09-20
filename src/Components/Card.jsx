import styled from "styled-components"
import Tag from "../Tag";

const TicketCard = styled.div`
  background-color: #ffff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%; 
  max-width: 300px;
  box-sizing: border-box;
  margin: 12px 6px;

  @media (max-width: 768px) {
    max-width: 100%; 
  }

  @media (max-width: 480px) {
    padding: 8px;
    max-width: 100%; 
    }
`;

const Box = styled.span`
  border: 1px solid rgba(148, 145, 145, 0.1);
  padding: 4px;
  width: 20px;
`;

const Row = styled.div`
  padding: 16px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

function Card({ ticket, priority }) {
    priority = priority.replace(" ", "-")
    return (
        <TicketCard>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{ticket.id}</span>
                <img
                    src="https://png.pngtree.com/png-clipart/20230904/original/pngtree-profile-picture-vector-illustration-12-png-image_10845726.png"
                    alt="img"
                    height="30px"
                />
            </p>

            <h4>{ticket.title}</h4>

            <Row>
                <Box>
                    <img src={`/img/${priority}.svg`} alt="" />
                </Box>

                {ticket.tag.map((e) => (
                    <Tag key={e} tag={e} />
                ))}
            </Row>
        </TicketCard>
    );
}

export default Card;
