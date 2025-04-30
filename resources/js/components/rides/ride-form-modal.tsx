import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

interface RideFormModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    ride?: any;
    cities: string[];
}

export function RideFormModal({ open, setOpen, ride, cities }: RideFormModalProps) {
    const { t } = useTranslation();

    const { data, setData, post, put, processing, errors, reset } = useForm({
        from: '',
        to: '',
        date: '',
        time: '',
        vehicle_type: 'car',
        seats: 1,
        price: '',
        phone_number: '',
        notes: '',
    });

    useEffect(() => {
        if (ride) {
            setData({
                from: ride.from,
                to: ride.to,
                date: ride.date,
                time: ride.time,
                vehicle_type: ride.vehicle_type,
                seats: ride.seats,
                price: ride.price,
                phone_number: ride.phone_number,
                notes: ride.notes || '',
            });
        } else {
            reset();
        }
    }, [ride, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const action = ride ? put : post;
        const url = ride ? `/rides/${ride.id}` : '/rides';

        action(url, {
            onSuccess: () => {
                toast.success(ride ? t('Ride updated successfully!') : t('Ride created successfully!'));
                setOpen(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-xl modal">
                <DialogHeader>
                    <DialogTitle>{ride ? t('Update Ride') : t('Create Ride')}</DialogTitle>
                    <DialogDescription>
                        {ride ? t('Edit the selected ride below') : t('Fill out the form to publish your ride')}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Select value={data.from} onValueChange={(value) => setData('from', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('From')} />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.from && <p className="text-sm text-red-500">{errors.from}</p>}

                    <Select value={data.to} onValueChange={(value) => setData('to', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('To')} />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.to && <p className="text-sm text-red-500">{errors.to}</p>}

                    <div className="flex gap-4">
                        <Input type="date" required value={data.date} onChange={(e) => setData('date', e.target.value)} className="flex-1" />
                        <Input type="time" required value={data.time} onChange={(e) => setData('time', e.target.value)} className="flex-1" />
                    </div>

                    <Select value={data.vehicle_type} onValueChange={(value) => setData('vehicle_type', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder={t('Vehicle Type')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="car">{t('Car')}</SelectItem>
                            <SelectItem value="van">{t('Van')}</SelectItem>
                            <SelectItem value="bus">{t('Bus')}</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.vehicle_type && <p className="text-sm text-red-500">{errors.vehicle_type}</p>}

                    <Input type="number" required min={1} placeholder={t('Seats')} value={data.seats} onChange={(e) => setData('seats', +e.target.value)} />
                    <Input type="number" required step="0.01" placeholder={t('Price')} value={data.price} onChange={(e) => setData('price', e.target.value)} />
                    <Input required placeholder={t('Phone Number')} value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} />
                    <Textarea placeholder={t('Notes')} value={data.notes} onChange={(e) => setData('notes', e.target.value)} />

                    <Button type="submit" disabled={processing} className="w-full">
                        {ride ? t('Update Ride') : t('Publish Ride')}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
