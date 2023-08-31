'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "../ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {

    const { isOpen, onClose } = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        // TODO: Create Store
    }

    return (
        <Modal
            title="Create Store"
            description="This is a description"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                name='name'
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder='E-Commerce' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex space-x-2 pt-6 items-center justify-end w-full'>
                                <Button
                                    variant='outline'
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button type='submit'>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}