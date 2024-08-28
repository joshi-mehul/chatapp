"use strict";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
  FC,
  useEffect,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IDateFilterParams,
  ModuleRegistry,
  RowSelectedEvent,
} from "@ag-grid-community/core";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { A79TableHeader } from "./A79TableHeader";
import "./A79Table.css";

export type IOlympicData = {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
};

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  MultiFilterModule,
  SetFilterModule,
]);

const filterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    const dateAsString = cellValue;
    if (dateAsString == null) return -1;
    const dateParts = dateAsString.split("/");
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

export type A79TableProps = {
  onOpenChat: (isChatOpen: boolean) => void;
  onRowSelection: (selection: Conversations) => void;
};

export type MessageContextPayload = {
  tabular_data?: string;
};

export type Conversations = {
  conversation_id?: number;
  content: string;
  message_context?: MessageContextPayload;
};

export const A79Table: FC<A79TableProps> = ({ onOpenChat, onRowSelection }) => {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState<IOlympicData[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: "athlete", headerName: "Name" },
    { field: "country", filter: "agSetColumnFilter" },
    { field: "sport", filter: "agMultiColumnFilter", headerName: "Games" },
    { field: "age", filter: "agNumberColumnFilter", maxWidth: 100 },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
    },

    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
    { field: "total", filter: false },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: "agTextColumnFilter",
      suppressHeaderMenuButton: true,
      suppressHeaderContextMenu: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.addEventListener("firstDataRendered", ({ api }) => {
      // Has to wait until the next tick
      setTimeout(() => {
        if (api.getDisplayedRowAtIndex) {
          api?.getDisplayedRowAtIndex(0)?.setSelected(true);
        }
      }, 0);
    });
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  const handleRowSelection = (event: RowSelectedEvent) => {
    onOpenChat(true);
    const conv: Conversations = {
      conversation_id: event.node.rowIndex ?? -Infinity,
      content: "What is this data?",
      message_context: event.data.toString(),
    };
    onRowSelection(conv);
  };

  return (
    <div className="A79TableContainer">
      <A79TableHeader name="123" onOpenChat={onOpenChat} />
      <div style={gridStyle} className={"ag-theme-quartz-dark"}>
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          rowSelection="single"
          onRowSelected={handleRowSelection}
        />
      </div>
    </div>
  );
};
