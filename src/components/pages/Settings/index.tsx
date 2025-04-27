'use client';
import AccountSetting from '@/components/parts/Account/Settings/AccountSetting';
import ChangePasswordForm from '@/components/parts/Account/Settings/ChangePasswordForm';
import ShippingAddressForm from '@/components/parts/Account/ShippingAddress/ShippingAddressForm';
import { useGetUserInformation } from '@/query/user';

const Settings = () => {
  const { data: user } = useGetUserInformation();

  const { fullName, email, phone } = user || {};

  return (
    <section className="grid grid-cols-1 gap-5">
      <AccountSetting
        user={{
          id: user?.id,
          fullName: fullName || '',
          email: email || '',
          phone: phone || '',
        }}
      />
      <ShippingAddressForm addresses={user?.address} />
      <ChangePasswordForm />
    </section>
  );
};

export default Settings;
