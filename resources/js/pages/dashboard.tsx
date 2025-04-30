import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { RideFormModal } from '@/components/rides/ride-form-modal';
import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Toaster } from 'sonner';


export default function Dashboard() {
    const {t} = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: t('Dashboard'),
            href: '/dashboard',
        },
    ];

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedRide, setSelectedRide] = useState(null);

    const openCreateModal = () => {
        setSelectedRide(null);
        setModalOpen(true);
    };

    const openEditModal = (ride: any) => {
        setSelectedRide(ride);
        setModalOpen(true);
    };

    const { rideCount, upcomingRideCount, mostFrequentRoute, rides, cities } = usePage().props as any;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Card className="relative aspect-video flex flex-col justify-between p-4">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg">{t('Published Rides')}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <p className="text-3xl font-bold">{rideCount}</p>
                        </CardContent>
                        <div className="mt-4">
                            <Button onClick={openCreateModal} className="w-full">
                                + {t('Create Ride')}
                            </Button>
                        </div>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Rides</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{upcomingRideCount}</p>
                        </CardContent>
                    </Card>
                    <Card className="relative aspect-video flex flex-col justify-between p-4">
                        <CardHeader className="p-0">
                            <CardTitle className="text-lg">Most Frequent Route</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {mostFrequentRoute ? (
                                <p className="text-xl font-semibold">
                                    {mostFrequentRoute.from} → {mostFrequentRoute.to}
                                </p>
                            ) : (
                                <p className="text-muted-foreground">No routes available</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative flex-1 overflow-hidden rounded-xl border p-4">
                    <h2 className="text-xl font-semibold mb-4">{t('Your Rides')}</h2>
                    <Table>
                        <TableCaption>{t('A list of your recent rides.')}</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('From')}</TableHead>
                                <TableHead>{t('To')}</TableHead>
                                <TableHead>{t('Date')}</TableHead>
                                <TableHead className="text-right">{t('Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rides?.length > 0 ? (
                                rides.map((ride: any) => (
                                    <TableRow key={ride.id}>
                                        <TableCell>{ride.from}</TableCell>
                                        <TableCell>{ride.to}</TableCell>
                                        <TableCell>{ride.date}</TableCell>
                                        <TableCell>{ride.vehicle_type}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="outline" size="sm" onClick={() => openEditModal(ride)}>
                                                {t('Update')}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-6">
                                        {t('No rides available.')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <RideFormModal open={modalOpen} setOpen={setModalOpen} ride={selectedRide} cities={cities} />
            <Toaster richColors position="top-center" />
        </AppLayout>
    );
}
