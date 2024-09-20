import { useState } from "react";
import styled from "styled-components";
import { useData } from "../context/DataContext";

const StyledHeader = styled.header`
  width: 100%;
  background-color: white;
  padding: 20px;
  display: flex;
  top: 0;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 5px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 60px;
  left: 20px;
  background-color: #f0f4f8;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  list-style: none;
  width: 200px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const DropdownItem = styled.li`
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

function Header() {
  const { grouping, sorting, setSorting, setGrouping } = useData();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isGroupingOpen, setIsGroupingOpen] = useState(false);
  const [isOrderingOpen, setIsOrderingOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleGrouping = () => {
    setIsGroupingOpen(!isGroupingOpen);
  };

  const toggleOrdering = () => {
    setIsOrderingOpen(!isOrderingOpen);
  };

  return (
    <StyledHeader>
      <DropdownButton onClick={toggleDropdown}>
        <img src="/img/Display.svg" alt="" /> <span>Display</span>
        <img src="/img/down.svg" alt="" />
      </DropdownButton>
      <DropdownMenu isOpen={isDropdownOpen}>
        <DropdownItem>
          <span>Grouping</span>
          <DropdownButton onClick={toggleGrouping}>
            {grouping}
            <img src="/img/down.svg" alt="" />
          </DropdownButton>
          <DropdownMenu isOpen={isGroupingOpen} style={{ top: "70px" }}>
            <DropdownItem onClick={() => {
              setGrouping("Status")
              toggleGrouping();
            }}>
              Status
            </DropdownItem>
            <DropdownItem onClick={() => {
              setGrouping("User")
              toggleGrouping();
            }}>
              User
            </DropdownItem>
            <DropdownItem onClick={() => {
              setGrouping("Priority")
              toggleGrouping();
            }}>
              Priority
            </DropdownItem>
          </DropdownMenu>
        </DropdownItem>
        <DropdownItem>
          Ordering
          <DropdownButton onClick={toggleOrdering}>
            {sorting}
            <img src="/img/down.svg" alt="" />
          </DropdownButton>
          <DropdownMenu isOpen={isOrderingOpen} style={{ top: "130px" }}>
            <DropdownItem onClick={() => {
              setSorting("Title")
              toggleOrdering();
            }}>
              Title
            </DropdownItem>
            <DropdownItem onClick={() => {
              setSorting("Priority")
              toggleOrdering();
            }}>
              Priority
            </DropdownItem>
          </DropdownMenu>
        </DropdownItem>
      </DropdownMenu>
    </StyledHeader>
  );
}

export default Header;