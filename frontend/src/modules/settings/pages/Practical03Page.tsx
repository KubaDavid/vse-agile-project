import { type ReactNode } from 'react';
import {
  Box,
  Button,
  Field,
  Flex,
  Input,
  NativeSelect,
  RadioGroup,
  Stack,
  Switch,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as zod from 'zod';

import { Heading, Paragraph } from '@frontend/shared/design-system/components';

const NOTIFICATION_OPTIONS = [
  { label: 'Every time someone quacks', value: 'all' },
  { label: 'Only mentions (@username)', value: 'mentions' },
  { label: 'Never', value: 'never' },
] as const;

const VISIBILITY_OPTIONS = [
  { label: 'Public', value: 'public' },
  { label: 'Private', value: 'private' },
  { label: 'Only friends', value: 'friends' },
];

export function Practical03Page() {
  return (
    <Stack gap={{ base: '6', md: '8' }}>
      <Heading>Practical 03</Heading>
      <Stack gap={{ base: '6', md: '8' }}>
        <NotificationsCard />
        <ProfileCard />
      </Stack>
    </Stack>
  );
}

const notificationsSchema = zod.object({
  notificationLevel: zod.enum(
    [
      NOTIFICATION_OPTIONS[0].value,
      NOTIFICATION_OPTIONS[1].value,
      NOTIFICATION_OPTIONS[2].value,
    ],
    {
      errorMap: () => ({ message: 'Please choose a notification option' }),
    },
  ),
});

type NotificationsFormValues = zod.infer<typeof notificationsSchema>;

function NotificationsCard() {
  const {
    control,
    handleSubmit,
  } = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    defaultValues: { notificationLevel: 'mentions' },
  });

  const handleNotificationsSubmit = (values: NotificationsFormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <SimpleCard>
      <form onSubmit={handleSubmit(handleNotificationsSubmit)} noValidate>
        <Stack gap="5">
          <Stack gap="1">
            <Heading as="h2" fontSize="3xl" mb="0">
              Notifications
            </Heading>
            <Paragraph color="gray.600">
              Setup how much notification you will receive
            </Paragraph>
          </Stack>

          <Controller
            name="notificationLevel"
            control={control}
            render={({ field, fieldState }) => (
              <Field.Root invalid={fieldState.invalid}>
                <Field.Label fontWeight="medium">
                  Notification preference
                </Field.Label>
                <RadioGroup.Root
                  value={field.value}
                  onValueChange={({ value: nextValue }) => {
                    if (nextValue) {
                      field.onChange(nextValue);
                    }
                  }}
                  colorPalette="gray"
                  variant="outline"
                >
                  <Stack gap="3">
                    {NOTIFICATION_OPTIONS.map((option) => (
                      <RadioGroup.Item key={option.value} value={option.value}>
                        <RadioGroup.ItemHiddenInput name={field.name} />
                        <Flex align="center" gap="3">
                          <RadioGroup.ItemControl />
                          <RadioGroup.ItemText>{option.label}</RadioGroup.ItemText>
                        </Flex>
                      </RadioGroup.Item>
                    ))}
                  </Stack>
                </RadioGroup.Root>
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Button type="submit" alignSelf="flex-end" colorPalette="green">
            Save
          </Button>
        </Stack>
      </form>
    </SimpleCard>
  );
}

const profileSchema = zod.object({
  firstName: zod.string().trim().min(1, 'First name is required'),
  lastName: zod.string().trim().min(1, 'Last name is required'),
  username: zod.string().trim().min(1, 'Username is required'),
  email: zod
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  profileBio: zod.string().trim().min(1, 'Profile bio is required'),
  visibility: zod.enum([
    VISIBILITY_OPTIONS[0].value,
    VISIBILITY_OPTIONS[1].value,
    VISIBILITY_OPTIONS[2].value,
  ]),
  agreeToTerms: zod
    .boolean()
    .refine((value) => value, 'You must agree to Terms and Conditions'),
});

type ProfileFormValues = zod.infer<typeof profileSchema>;

function ProfileCard() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      profileBio: '',
      visibility: 'public',
      agreeToTerms: false,
    },
  });

  const handleProfileSubmit = (values: ProfileFormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <SimpleCard>
      <form onSubmit={handleSubmit(handleProfileSubmit)} noValidate>
        <Stack gap="5">
          <Stack gap="1">
            <Heading as="h2" fontSize="3xl" mb="0">
              Profile
            </Heading>
            <Paragraph color="gray.600">
              This is your profile information.
            </Paragraph>
          </Stack>

          <Stack gap="4">
            <Field.Root invalid={!!errors.firstName}>
              <Field.Label>First name</Field.Label>
              <Input
                placeholder="Enter your first name"
                {...register('firstName')}
              />
              <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.lastName}>
              <Field.Label>Last name</Field.Label>
              <Input
                placeholder="Enter your last name"
                {...register('lastName')}
              />
              <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.username}>
              <Field.Label>Username</Field.Label>
              <Input
                placeholder="Enter your username"
                {...register('username')}
              />
              <Field.ErrorText>{errors.username?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="john@example.com"
                type="email"
                {...register('email')}
              />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.profileBio}>
              <Field.Label>Profile bio</Field.Label>
              <Textarea
                placeholder="Tell us about yourself"
                minHeight="32"
                {...register('profileBio')}
              />
              <Field.ErrorText>{errors.profileBio?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.visibility}>
              <Field.Label>Visibility</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field {...register('visibility')}>
                  {VISIBILITY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
              <Field.ErrorText>{errors.visibility?.message}</Field.ErrorText>
            </Field.Root>
          </Stack>

          <Controller
            name="agreeToTerms"
            control={control}
            render={({ field, fieldState }) => (
              <Field.Root invalid={fieldState.invalid}>
                <Switch.Root
                  checked={field.value}
                  onCheckedChange={({ checked }) => field.onChange(checked)}
                  colorPalette="green"
                >
                  <Switch.HiddenInput
                    ref={field.ref}
                    name={field.name}
                    value={field.value ? 'true' : 'false'}
                    onBlur={field.onBlur}
                  />
                  <Switch.Control />
                  <Switch.Label>Agree to Terms and Conditions</Switch.Label>
                </Switch.Root>
                <Field.ErrorText>{fieldState.error?.message}</Field.ErrorText>
              </Field.Root>
            )}
          />

          <Flex justify="flex-end">
            <Button type="submit" colorPalette="green">
              Save
            </Button>
          </Flex>
        </Stack>
      </form>
    </SimpleCard>
  );
}

type SimpleCardProps = {
  children: ReactNode;
};

function SimpleCard({ children }: SimpleCardProps) {
  return (
    <Box p="6" borderRadius="xl" bg="white" boxShadow="sm">
      {children}
    </Box>
  );
}
