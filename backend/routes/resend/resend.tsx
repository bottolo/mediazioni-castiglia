import {Hono} from 'hono';
import {Resend} from 'resend';

const resend = new Resend('re_TA8KGdVw_KcBgP4JYKgD6uRx3o9vUUiJ5');

export const resendRoute = new Hono().get('/', async (c) => {
    const { data, error } = await resend.emails.send({
        from: 'Some dude <onboarding@resend.dev>',
        to: ['samuele.castiglia,98@gmail.com'],
        subject: 'Well...',
        html: '<p>It works!</p>',
    });

    if (error) {
        return c.json(error, 400);
    }

    return c.json(data);
});
