/** @jsx createElement */

import {
  CellProps,
  RowProps,
  SortedTableProps,
  TableProps,
} from './types/ui-react.d';
import {CellView, RowView, SortedTableView, TableView} from './ui-react';
import {
  DomProps,
  DomSortedTableView as DomSortedTableViewDecl,
  DomTableCellView as DomTableCellViewDecl,
  DomTableRowView as DomTableRowViewDecl,
  DomTableView as DomTableViewDecl,
} from './types/ui-react-dom.d';
import React from 'react';
import {isUndefined} from './common/other';

const {createElement} = React;

const useClassName = (className?: string): {className?: string} =>
  isUndefined(className) ? {} : {className};

export const DomTableCellView: typeof DomTableCellViewDecl = ({
  className,
  ...props
}: CellProps & DomProps): any => (
  <td {...useClassName(className)}>
    <CellView {...props} />
  </td>
);

export const DomTableRowView: typeof DomTableRowViewDecl = ({
  className,
  ...props
}: RowProps & DomProps): any => (
  <tr {...useClassName(className)}>
    <RowView cellComponent={DomTableCellView} {...props} />
  </tr>
);

export const DomSortedTableView: typeof DomSortedTableViewDecl = ({
  className,
  ...props
}: SortedTableProps & DomProps): any => (
  <table {...useClassName(className)}>
    <tbody>
      <SortedTableView rowComponent={DomTableRowView} {...props} />
    </tbody>
  </table>
);

export const DomTableView: typeof DomTableViewDecl = ({
  className,
  ...props
}: TableProps & DomProps): any => (
  <table {...useClassName(className)}>
    <tbody>
      <TableView rowComponent={DomTableRowView} {...props} />
    </tbody>
  </table>
);