import { Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

type Response = {
  success: boolean;
  status: number;
  data: {
    ok: boolean;
    code: string;
    result: {
      response_map: ResponseMap;
      is_new_format: boolean;
    };
  };
};

type ResponseMap = {
  [key: string]: TrackDetails;
};

type TrackDetails = {
  data: {
    order_id: string;
    tracking_id: string;
    order_info: OrderInfo;
    product_info: ProductInfo;
    tracking_info: TrackingInfo[];
  };
  error: string;
};

type OrderInfo = {
  edd: Date;
  order_placed_date: Date;
  last_update_date: Date;
  courier_name: string;
  is_prepaid: boolean;
  cod_amount: null;
};

type ProductInfo = {
  brand_name: string;
  item_list: ItemList[];
};

type ItemList = {
  item_name: string;
  item_price: number;
  item_quantity: number;
};

type TrackingInfo = {
  status_type: string;
  consecutive_events: ConsecutiveEvent[];
};

type ConsecutiveEvent = {
  scan_time: Date;
  scan_location: null | string;
  scan_status: string;
};

const CourierTrack: React.FC = () => {
  const [trackingNum, setTrackingNum] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    order_id: string;
    tracking_id: string;
    order_info: OrderInfo;
    product_info: ProductInfo;
    tracking_info: TrackingInfo[];
  } | null>(null);

  const handleClick = async () => {
    const response = await fetch(
      `https://pickrr.com/track/${trackingNum}?_data=routes%2Ftrack%2F%24index`
    );
    const responseData: Response = await response.json();
    const { response_map } = responseData.data.result;

    if (!(trackingNum in response_map)) {
      setError('Invalid tracking number or We dont support this service');
      return;
    }

    const { data, error } = response_map[trackingNum] as TrackDetails;

    if (error) {
      setError(error);
      return;
    }

    setResult(data);
    return;
  };

  return (
    <Stack spacing={3} mx={2} my={5}>
      <TextField
        label="Enter your consignment number"
        variant="outlined"
        value={trackingNum}
        onChange={(e) => setTrackingNum(e.target.value)}
        fullWidth
      />
      <Button variant="outlined" onClick={handleClick}>
        Fetch Details
      </Button>
      {}
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {result && (
        <Typography variant="body1">
          <>
            Order ID: {result.order_id}
            Tracking ID: {result.tracking_id}
            Order Placed Date: {result.order_info.order_placed_date}
            Last Update Date: {result.order_info.last_update_date}
            Courier Name: {result.order_info.courier_name}
          </>
        </Typography>
      )}
    </Stack>
  );
};

export default CourierTrack;
