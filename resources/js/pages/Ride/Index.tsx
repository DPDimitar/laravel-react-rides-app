import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useState, useMemo } from 'react';
import { format } from "date-fns";
import { Popover } from '@/components/ui/popover';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function RideIndex() {
    const { rides, cities } = usePage().props as any;
    const { t } = useTranslation();

    const breadcrumbs: BreadcrumbItem[] = [
        { title: t('Published Rides'), href: '/rides' }
    ];

    const [filters, setFilters] = useState({
        from: 'all',
        to: 'all',
        vehicle_type: 'all',
        date_from: '',
        date_to: '',
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const filteredRides = rides.filter((ride: any) => {
        const matchesFrom = filters.from === 'all' || ride.from === filters.from;
        const matchesTo = filters.to === 'all' || ride.to === filters.to;
        const matchesVehicle = filters.vehicle_type === 'all' || ride.vehicle_type === filters.vehicle_type;
        const matchesDateFrom = !filters.date_from || new Date(ride.date) >= new Date(filters.date_from);
        const matchesDateTo = !filters.date_to || new Date(ride.date) <= new Date(filters.date_to);

        return matchesFrom && matchesTo && matchesVehicle && matchesDateFrom && matchesDateTo;
    });

    const paginatedRides = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredRides.slice(start, start + itemsPerPage);
    }, [filteredRides, currentPage]);

    const totalPages = Math.ceil(filteredRides.length / itemsPerPage);

    const resetFilters = () => {
        setFilters({ from: 'all', to: 'all', vehicle_type: 'all', date_from: '', date_to: '' });
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={t('Published Rides')} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border p-4 md:min-h-min">
                    <h1 className="mb-4 text-2xl font-bold">{t('Published Rides')}</h1>

                    {/* Filters */}
                    <div className="filters mb-6 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {cities?.length > 0 ? (
                            <>
                                <Select value={filters.from} onValueChange={(value) => {
                                    setFilters(prev => ({ ...prev, from: value }));
                                    setCurrentPage(1);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('From')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('From')}</SelectItem>
                                        {cities.map((city: string) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={filters.to} onValueChange={(value) => {
                                    setFilters(prev => ({ ...prev, to: value }));
                                    setCurrentPage(1);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('To')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('To')}</SelectItem>
                                        {cities.map((city: string) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={filters.vehicle_type} onValueChange={(value) => {
                                    setFilters(prev => ({ ...prev, vehicle_type: value }));
                                    setCurrentPage(1);
                                }}>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t('Vehicle Type')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">{t('All Vehicles')}</SelectItem>
                                        <SelectItem value="car">{t('Car')}</SelectItem>
                                        <SelectItem value="van">{t('Van')}</SelectItem>
                                        <SelectItem value="bus">{t('Bus')}</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* From Date */}
                                <Popover>
                                    <div>
                                        <DatePicker
                                            selected={filters.date_from ? new Date(filters.date_from) : null}
                                            onChange={(date: Date | null) => {
                                                setFilters(prev => ({ ...prev, date_from: date ? format(date, 'yyyy-MM-dd') : '' }));
                                                setCurrentPage(1);
                                            }}
                                            placeholderText={t('From Date')}
                                            dateFormat="PPP"
                                            className="w-full border rounded px-3 py-2 text-sm" // Add Tailwind styles if you want
                                        />
                                    </div>
                                </Popover>

                                {/* To Date */}
                                <Popover>
                                    <div>
                                        <DatePicker
                                            selected={filters.date_to ? new Date(filters.date_to) : null}
                                            onChange={(date: Date | null) => {
                                                setFilters(prev => ({ ...prev, date_to: date ? format(date, 'yyyy-MM-dd') : '' }));
                                                setCurrentPage(1);
                                            }}
                                            placeholderText={t('To Date')}
                                            dateFormat="PPP"
                                            className="w-full border rounded px-3 py-2 text-sm"
                                        />
                                    </div>
                                </Popover>

                                <div className="flex flex-col gap-2">
                                    <Button variant="secondary" onClick={resetFilters}>
                                        {t('Reset')}
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p>{t('No cities found.')}</p>
                        )}
                    </div>

                    {/* Rides */}
                    <div className="flex flex-col flex-1">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {paginatedRides.length === 0 ? (
                                <p>{t('No rides available.')}</p>
                            ) : (
                                paginatedRides.map((ride: any) => (
                                    <Link key={ride.id} href={route('rides.show', ride.id)}>
                                        <div className="rounded-lg border p-4 shadow-sm">
                                            <div className="text-lg font-semibold">
                                                {ride.from} → {ride.to}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {ride.date} at {ride.time} · {t(ride.vehicle_type)} · {ride.seats} {t('seats')} · €{ride.price}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="mt-auto flex justify-center items-center gap-2 pt-6">
                            <Button size="sm" variant="outline" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                {t('Previous')}
                            </Button>

                            {[...Array(totalPages)].map((_, index) => (
                                <Button
                                    key={index}
                                    size="sm"
                                    variant={currentPage === index + 1 ? 'default' : 'outline'}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Button>
                            ))}

                            <Button size="sm" variant="outline" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                {t('Next')}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
