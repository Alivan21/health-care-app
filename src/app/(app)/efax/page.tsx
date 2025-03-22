import { PageHeader } from '@/components/layouts/header';
import React from 'react'
import EfaxClient from './client';

export default function EfaxPage() {
  const breadcrumbs = [
    { title: "Dashboard", link: "/" },
    { title: "eFax", link: "/efax" },
  ];

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <EfaxClient />
    </>
  ) 
}
