import React from 'react';
import { Icon } from '@iconify/react';
import { useGetCountQuery } from '../../redux/apis/countApi';
import { useGetAllinvoiceQuery } from "../../redux/apis/invoiceApi";
import SalesOverview from './SalesOverview';
import RevenueStatistic from './RevenueStatistic';
import { useNavigate } from "react-router-dom";

const DashboardInfo = () => {
  const { data, isLoading, isError } = useGetCountQuery();
  const { data: invoiceData, isLoading: invoiceLoading } = useGetAllinvoiceQuery();
  const navigate = useNavigate();

  const SkeletonCard = () => (
    <div className="flex items-center p-4 bg-white rounded-lg shadow animate-pulse">
      <div className="p-3 rounded-full bg-gray-300 w-12 h-12" />
      <div className="ml-4 flex-1">
        <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );

  const SkeletonChart = () => (
    <div className="bg-white h-[300px] rounded-lg shadow animate-pulse">
      <div className="h-full w-full bg-gray-200 rounded-lg"></div>
    </div>
  );

  if (isLoading || invoiceLoading) {
    return (
      <div className="p-6 mt-5 space-y-6">
        
        {/* Skeleton Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        {/* Skeleton Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    );
  }

  // -----------------------------------------
  //           NORMAL DASHBOARD CONTENT
  // -----------------------------------------
  if (isError) return <p>Something went wrong!</p>;

  const userCount = data?.data?.userCount ?? 0;
  const orderCount = data?.data?.orderCount ?? 0;
  const productCount = data?.data?.productCount ?? 0;

  const totalInvoices = invoiceData?.stats?.totalInvoices ?? 0;
  const totalRevenue = invoiceData?.stats?.totalAmount ?? 0;

  const cardData = [
    {
      title: 'Total Customers',
      value: userCount,
      icon: <Icon icon="mdi:users" className="w-8 h-8 text-white" />,
      path: "/customers"
    },
    {
      title: 'Invoices',
      value: totalInvoices,
      icon: <Icon icon="material-symbols-light:docs-rounded" className="w-8 h-8 text-white" />,
      path: "/invoice"
    },
    {
      title: 'Products',
      value: productCount,
      icon: <Icon icon="solar:bag-bold" className="w-8 h-8 text-white" />,
      path: "/productIn"
    },
    {
      title: 'Revenue',
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: <Icon icon="healthicons:money-bag" className="w-8 h-8 text-white" />,
      path: "/revenue"
    },
  ];

  return (
    <div className="p-6 mt-5 space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:scale-[1.03] transition shadow-[0_3.7px_14.35px_-0.93px_rgba(255,0,123,0.3)]"
          >
            <div className="p-3 rounded-full bg-gradient-to-t from-[#280F22] to-[#FF007B] flex items-center justify-center">
              {card.icon}
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{card.title}</p>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SalesOverview />
        <RevenueStatistic />
      </div>
    </div>
  );
};

export default DashboardInfo;
