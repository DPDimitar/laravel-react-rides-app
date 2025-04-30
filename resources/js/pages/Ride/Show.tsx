import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { type BreadcrumbItem } from '@/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function RideShow() {
    const { t } = useTranslation();
    const { ride } = usePage().props as any;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Published Rides'), href: '/rides' },
        { title: `${ride.from} → ${ride.to}`, href: `/rides/${ride.id}` }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${ride.from} → ${ride.to}`} />

            <Card className="mt-10">
                <CardHeader>
                    <CardTitle>{ride.from} → {ride.to}</CardTitle>
                    <CardDescription>
                        {t('Date')}: {ride.date} {t('at')} {ride.time}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                    <div>
                        <strong>{t('Vehicle Type')}:</strong> {t(ride.vehicle_type)}
                    </div>
                    <div>
                        <strong>{t('Seats')}:</strong> {ride.seats}
                    </div>
                    <div>
                        <strong>{t('Price')}:</strong> €{ride.price}
                    </div>
                    <div>
                        <strong>{t('Phone Number')}:</strong> {ride.phone_number}
                    </div>
                    {ride.notes && (
                        <div>
                            <strong>{t('Notes')}:</strong> {ride.notes}
                        </div>
                    )}
                </CardContent>

                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        {t('Posted by')}: {ride.user.name}
                    </p>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
