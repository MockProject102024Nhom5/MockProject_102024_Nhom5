INSERT INTO [dbo].[payments]
    (
        [residentId],
        [paymentDate],
        [paymentTypeId],
        [amount],
        [paymentMethod],
        [deflag]
    )

VALUES(
    @residentId,
    @paymentDate,
    @paymentTypeId,
    @amount,
    @paymentMethod,
    @deflag
)

SELECT SCOPE_IDENITY() AS paymentId