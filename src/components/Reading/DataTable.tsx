import React from 'react';
import styled from 'styled-components';
import { newBrandColors } from '../../styles/foundations/theme';
import type { SensitivityTable } from '../../types/Reading';

const TableContainer = styled.div`
  margin: 2rem 0;
`;

const TableTitle = styled.h4`
  color: ${newBrandColors.charcoal};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const TableDescription = styled.p`
  color: ${newBrandColors.charcoal};
  margin-bottom: 1rem;
  opacity: 0.8;
  font-size: 0.9rem;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  border: 1px solid ${newBrandColors.lightBlue}50;
  padding: 12px 8px;
  text-align: center;
  background: linear-gradient(135deg, ${newBrandColors.lightBlue}30, ${newBrandColors.beige}40);
  color: ${newBrandColors.charcoal};
  font-weight: 600;
  font-size: 0.9rem;
`;

const TableCell = styled.td<{ isRowHeader?: boolean }>`
  border: 1px solid ${newBrandColors.lightBlue}30;
  padding: 10px 8px;
  text-align: center;
  color: ${newBrandColors.charcoal};
  font-weight: ${props => props.isRowHeader ? '600' : '400'};
  background-color: ${props => props.isRowHeader ? newBrandColors.beige + '40' : 'transparent'};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${newBrandColors.beige}20;
  }
`;

const TableNote = styled.p`
  font-size: 0.8rem;
  color: ${newBrandColors.charcoal};
  opacity: 0.7;
  font-style: italic;
  margin-top: 0.5rem;
`;

interface DataTableProps {
  data: SensitivityTable;
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <TableContainer>
      <TableTitle>{data.title}</TableTitle>
      {data.description && <TableDescription>{data.description}</TableDescription>}
      
      <StyledTable>
        <thead>
          <TableRow>
            <TableHeader>{/* Empty cell for row headers */}</TableHeader>
            {data.headers.map((header, index) => (
              <TableHeader key={index}>{header}</TableHeader>
            ))}
          </TableRow>
        </thead>
        <tbody>
          {data.data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell isRowHeader>
                {data.rowHeaders[rowIndex]}
              </TableCell>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>
                  {typeof cell === 'number' ? cell.toFixed(2) : cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      
      {data.note && <TableNote>{data.note}</TableNote>}
    </TableContainer>
  );
}; 