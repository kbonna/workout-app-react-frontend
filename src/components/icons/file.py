h_tot = np.nansum(pd)
h_within = np.nansum(
    np.hstack(
        [
            pd[
                n_subjects_ok * n : n_subjects_ok * (n + 1),
                n_subjects_ok * n : n_subjects_ok * (n + 1),
            ]
            for n in range(4)
        ]
    )
)
h_between = h_tot - h_between